export const ENJOYED_AT = ['home', 'coffeeShop', 'other'] as const;
export type EnjoyedAt = (typeof ENJOYED_AT)[number];

export const BREW_METHODS = [
  'espresso',
  'v60',
  'aeropress',
  'frenchPress',
  'chemex',
  'mokapot',
  'other'
] as const;
export type BrewMethod = (typeof BREW_METHODS)[number];
