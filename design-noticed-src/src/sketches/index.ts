import CoffeeMenu from './CoffeeMenu.astro';
import EditorialLayout from './EditorialLayout.astro';
import MrtSignage from './MrtSignage.astro';
import SelfCheckout from './SelfCheckout.astro';

export const sketches: Record<string, typeof CoffeeMenu> = {
  'coffee-menu': CoffeeMenu,
  'editorial-layout': EditorialLayout,
  'mrt-signage': MrtSignage,
  'self-checkout': SelfCheckout,
};
