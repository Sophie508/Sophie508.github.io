#!/usr/bin/env python3
"""Export public task/checklist fields and archived judgments; never run a judge."""
import argparse
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path

FIELDS = ('item_id', 'requirement', 'source_quote', 'verification_type',
          'verification_ref', 'verification', 'notes')


def read_json(path):
    return json.loads(path.read_text())


def records(path, key):
    result = {}
    for line_no, line in enumerate(path.read_text().splitlines(), 1):
        if not line.strip():
            continue
        row = json.loads(line)
        if row.get('status') == 'ok':
            result[row[key]] = (row, line_no)
    return result


def stats(answers):
    counts = Counter(a['answer'] for a in answers)
    y, n, a = (counts[x] for x in ('YES', 'NO', 'ABSTAIN'))
    return {'yes': y, 'no': n, 'abstain': a,
            'score': y / (y + n) if y + n else None,
            'coverage': (y + n) / (y + n + a) if y + n + a else None}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    args = parser.parse_args()
    root = args.source.resolve()
    dest = Path(__file__).resolve().parents[1] / 'data' / 'explorer'
    dest.mkdir(parents=True, exist_ok=True)
    category = {task: cat for cat, tasks in read_json(root / 'main_table/task_categories.json').items() for task in tasks}
    backfill = records(root / 'main_table/raw_backfill/results.jsonl', 'cell_id')
    definitions = [
        ('skillsbench', 'SkillsBench v1.1', 'main_table/generated_v2', 'main_table/leaderboard_all/results.jsonl', 87, 713),
        ('terminalbench', 'Terminal-Bench 2.0', 'crossbench/terminalbench/generated', 'crossbench/terminalbench/results.jsonl', 86, 585),
        ('swebench', 'SWE-bench Verified', 'crossbench/swebench/generated', 'crossbench/swebench/results.jsonl', 100, 336),
    ]
    index = {'version': 1, 'benchmarks': [], 'tasks': [], 'scope': 'Archived task checklists and compatible endpoint judgments; not a leaderboard or a representative performance sample.'}
    audit = {'excluded': Counter(), 'sources': {}}

    def source(path):
        rel = str(path.relative_to(root))
        if rel not in audit['sources']:
            audit['sources'][rel] = hashlib.sha256(path.read_bytes()).hexdigest()
        return rel

    for bench, label, checklist_dir, result_file, expected_tasks, expected_items in definitions:
        record_path = root / result_file
        source(record_path)
        archived = records(record_path, 'cell_id' if bench == 'skillsbench' else 'traj_id')
        by_task = {}
        for identity, (r, line) in archived.items():
            by_task.setdefault(r['task'], []).append((identity, r, line))
        manifest = {}
        if bench != 'skillsbench':
            with (root / f'crossbench/{bench}/selection_manifest.csv').open() as f:
                manifest = {r['traj_id']: r for r in csv.DictReader(f)}
        bench_tasks = []
        for path in sorted((root / checklist_dir).glob('*__seed1.json')):
            original = read_json(path)
            task = original['task']
            ids = [i['item_id'] for i in original['items']]
            assert len(ids) == len(set(ids))
            validation = {r['item_id']: r for r in original.get('mechanical_validity', {}).get('rows', [])}
            items = [{**{k: i.get(k, '') for k in FIELDS}, 'validation': validation.get(i['item_id'])} for i in original['items']]
            extra = []
            if bench == 'skillsbench':
                inst_path = root / f'benchmark/skillsbench-v1.1/tasks/{task}/task.md'
                instruction = inst_path.read_text()
                if instruction.startswith('---'):
                    instruction = instruction.split('---', 2)[2].strip()
                for env in sorted((inst_path.parent / 'environment').glob('*.md')):
                    extra.append({'name': env.name, 'text': env.read_text()[:20000], 'source': source(env)})
            elif bench == 'terminalbench':
                inst_path = root / f'crossbench/terminalbench/tasks_repo/{task}/instruction.md'
                instruction = inst_path.read_text()
            else:
                inst_path = root / f'crossbench/swebench/instances/{task}.json'
                instruction = read_json(inst_path)['problem_statement']
            runs = []
            for identity, record, line in sorted(by_task.get(task, [])):
                if record.get('official') not in (0, 1):
                    audit['excluded']['non_binary_outcome'] += 1
                    continue
                stored = record.get('answers', [])
                regular = [a for a in stored if a['item_id'] != 'OFFICIAL-ENDPOINT']
                if len(regular) != len(ids) or {a['item_id'] for a in regular} != set(ids):
                    audit['excluded']['checklist_id_mismatch'] += 1
                    continue
                assert all(a['answer'] in ('YES', 'NO', 'ABSTAIN') for a in stored)
                lookup = {a['item_id']: a for a in regular}
                anchored = []
                for item in items:
                    a = lookup[item['item_id']]
                    override = record['official'] == 1 and item['verification_type'] == 'assertion'
                    anchored.append({'item_id': item['item_id'], 'answer': a['answer'], 'basis': 'official-pass-rule' if override else 'log-judgment'})
                raw_answers = None
                raw_source = None
                raw_note = ''
                if bench == 'skillsbench':
                    if record['official'] == 0:
                        raw_answers = [{'item_id': a['item_id'], 'answer': a['answer']} for a in regular]
                        raw = stats(raw_answers)
                    elif identity in backfill:
                        rb, rb_line = backfill[identity]
                        if len(rb['answers']) == len(ids) and {a['item_id'] for a in rb['answers']} == set(ids):
                            raw_answers = rb['answers']
                            raw = stats(raw_answers)
                            raw_source = f'main_table/raw_backfill/results.jsonl:{rb_line}'
                            raw_note = 'Log-only judgments are from a separate archived rejudgment of the same run. The outcome-inclusive result is the original judging pass.'
                        else:
                            raw = None
                    else:
                        raw = None
                    config = record['config']
                    run_label = config.replace('__', ' · ')
                    condition = 'without skill' if '-no-skills' in config else ('with skill' if '-with-skills' in config else 'other configuration')
                else:
                    raw = {'yes': record['yes'], 'no': record['no'], 'abstain': record['abstain'], 'score': record['cpc_raw'], 'coverage': record['coverage']}
                    raw_answers = [{'item_id': a['item_id'], 'answer': a['answer']} for a in regular if not a.get('anchored')]
                    if len(raw_answers) < len(ids):
                        raw_note = 'The archive retains log-only totals but overwrote some item judgments with the official PASS rule. Those original item judgments are not available.'
                    meta = manifest[identity]
                    config = meta.get('submission', meta.get('model'))
                    run_label = config.replace('__', ' · ')
                    condition = 'archived run'
                anchored_stats = stats(stored)
                run = {'id': identity, 'label': run_label, 'condition': condition,
                       'official': record['official'], 'raw': raw, 'raw_answers': raw_answers,
                       'anchored': anchored_stats, 'anchored_answers': anchored,
                       'raw_note': raw_note, 'raw_source': raw_source,
                       'source': f'{result_file}:{line}', 'truncated': record.get('truncated', False)}
                runs.append(run)
            task_json = {'id': task, 'benchmark': bench, 'instruction': instruction, 'supplemental': extra,
                         'items': items, 'runs': runs,
                         'sources': {'instruction': source(inst_path), 'checklist': source(path)},
                         'seed': original.get('seed'), 'prompt_version': original.get('generator_prompt_version')}
            directory = dest / bench
            directory.mkdir(exist_ok=True)
            (directory / f'{task}.json').write_text(json.dumps(task_json, ensure_ascii=False, separators=(',', ':')) + '\n')
            summary = {'id': task, 'benchmark': bench, 'title': task.replace('__', ' / ').replace('-', ' '),
                       'category': category.get(task, 'software engineering' if bench == 'swebench' else 'terminal tasks'),
                       'items': len(items), 'runs': len(runs),
                       'valid': sum(v.get('valid', False) for v in validation.values()),
                       'validation_total': len(validation), 'file': f'{bench}/{task}.json'}
            index['tasks'].append(summary)
            bench_tasks.append(summary)
        assert len(bench_tasks) == expected_tasks
        assert sum(t['items'] for t in bench_tasks) == expected_items
        index['benchmarks'].append({'id': bench, 'label': label, 'tasks': expected_tasks, 'items': expected_items,
                                    'runs': sum(t['runs'] for t in bench_tasks)})
    source(root / 'main_table/raw_backfill/results.jsonl')
    (dest / 'index.json').write_text(json.dumps(index, ensure_ascii=False, separators=(',', ':')) + '\n')
    (dest / 'provenance.json').write_text(json.dumps(audit, indent=2) + '\n')
    print(json.dumps({'benchmarks': index['benchmarks'], 'excluded': audit['excluded']}, indent=2))


if __name__ == '__main__':
    main()
