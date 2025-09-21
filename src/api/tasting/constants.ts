export const ENJOYED_AT = ['home', 'coffeeShop', 'other'] as const;
export type EnjoyedAt = (typeof ENJOYED_AT)[number];

export const BREW_METHODS = [
  'espresso',
  'v60',
  'aeropress',
  'frenchPress',
  'coldBrew',
  'pourOver',
  'drip',
  'chemex',
  'mokapot',
  'other'
] as const;
export type BrewMethod = (typeof BREW_METHODS)[number];

export const BEVERAGES = [
  'doubleEspresso',
  'singleExpresso',
  'americano',
  'flatWhite',
  'cortado',
  'magic',
  'cappuccino',
  'latte',
  'ristretto',
  'lungo',
  'macchiato',
  'mocha',
  'other'
] as const;
export type Beverage = (typeof BEVERAGES)[number];
