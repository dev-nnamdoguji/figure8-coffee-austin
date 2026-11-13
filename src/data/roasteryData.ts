import heroCopperBarImg from '../assets/images/hero_copper_bar_1794559183344.jpg';
import menuPouroverCraftImg from '../assets/images/menu_pourover_craft_1794559184095.jpg';
import roasteryDrumBeansImg from '../assets/images/roastery_drum_beans_1794559184283.jpg';
import eastAustinPatioImg from '../assets/images/east_austin_patio_clean_1794559202973.jpg';

export type MenuCategory = 'all' | 'espresso' | 'pourover' | 'seasonal';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'all'>;
  categoryLabel: string;
  originOrPrep: string;
  tastingNotes: string;
  price: number;
  sizeNote: string;
}

export interface RoastBean {
  id: string;
  name: string;
  origin: string;
  process: string;
  roastLevel: string;
  tastingNotes: string;
  price12oz: number;
  price2lb: number;
  roastSchedule: string;
}

export type BagWeight = '12 oz' | '2 lb';
export type GrindOption = 'Whole Bean' | 'Espresso' | 'Pour-Over' | 'Drip';

export interface CartItem {
  beanId: string;
  name: string;
  weight: BagWeight;
  grind: GrindOption;
  unitPrice: number;
  quantity: number;
}

export const HERO_IMAGE = heroCopperBarImg;
export const MENU_IMAGE = menuPouroverCraftImg;
export const ROASTERY_IMAGE = roasteryDrumBeansImg;
export const PATIO_IMAGE = eastAustinPatioImg;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'double-espresso',
    name: 'Double Espresso',
    category: 'espresso',
    categoryLabel: 'Espresso Bar',
    originOrPrep: 'Chicon House Blend · Pulled 1:2 on the copper bar',
    tastingNotes: 'Toasted pecan, dark cacao, dried cherry',
    price: 3.75,
    sizeNote: '2 oz',
  },
  {
    id: 'cortado',
    name: 'Cortado',
    category: 'espresso',
    categoryLabel: 'Espresso Bar',
    originOrPrep: 'Equal parts double espresso and textured Texas Jersey milk',
    tastingNotes: 'Brown butter, milk chocolate, clean finish',
    price: 4.5,
    sizeNote: '4 oz',
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'espresso',
    categoryLabel: 'Espresso Bar',
    originOrPrep: 'Double ristretto · Micro-foamed whole or oat milk',
    tastingNotes: 'Caramelized sugar, roasted almond',
    price: 5.0,
    sizeNote: '6 oz',
  },
  {
    id: 'chicon-latte',
    name: 'Chicon Vanilla Latte',
    category: 'espresso',
    categoryLabel: 'Espresso Bar',
    originOrPrep: 'House-steeped Madagascar vanilla bean syrup · Hot or iced',
    tastingNotes: 'Sweet cream, toasted hazelnut, warm spice',
    price: 5.75,
    sizeNote: '10 oz / 14 oz',
  },
  {
    id: 'ethiopia-guji',
    name: 'Ethiopia Guji — Uraga',
    category: 'pourover',
    categoryLabel: 'Pour-Over',
    originOrPrep: 'Washed Heirloom · Brewed to order on ceramic V60',
    tastingNotes: 'Bergamot, white peach, honeysuckle',
    price: 6.0,
    sizeNote: '10 oz',
  },
  {
    id: 'colombia-huila',
    name: 'Colombia Huila — Finca El Mirador',
    category: 'pourover',
    categoryLabel: 'Pour-Over',
    originOrPrep: 'Honey-processed Pink Bourbon · Hand-poured',
    tastingNotes: 'Blood orange, cane sugar, red currant',
    price: 6.25,
    sizeNote: '10 oz',
  },
  {
    id: 'guatemala-huehue',
    name: 'Guatemala Huehuetenango',
    category: 'pourover',
    categoryLabel: 'Pour-Over',
    originOrPrep: 'Washed Caturra · Kalita Wave flat-bottom extraction',
    tastingNotes: 'Roasted walnut, golden raisin, cocoa nib',
    price: 5.5,
    sizeNote: '10 oz',
  },
  {
    id: 'espresso-tonic',
    name: 'Grapefruit Espresso Tonic',
    category: 'seasonal',
    categoryLabel: 'Cold & Seasonal',
    originOrPrep: 'Single-origin Ethiopian shot over dry quinine tonic & Texas ruby red peel',
    tastingNotes: 'Bright citrus, botanical bitter, crisp finish',
    price: 6.25,
    sizeNote: '12 oz iced',
  },
  {
    id: 'piloncillo-cold-brew',
    name: 'Piloncillo Cold Brew',
    category: 'seasonal',
    categoryLabel: 'Cold & Seasonal',
    originOrPrep: '18-hour cold steep · Raw Mexican cane syrup & cinnamon crema',
    tastingNotes: 'Molasses, dark chocolate, warm spice',
    price: 5.5,
    sizeNote: '12 oz / 16 oz',
  },
  {
    id: 'matcha-oat',
    name: 'Uji Matcha on Ice',
    category: 'seasonal',
    categoryLabel: 'Cold & Seasonal',
    originOrPrep: 'First-harvest Kyoto green tea hand-whisked with oat milk',
    tastingNotes: 'Sweet grass, toasted nori, creamy body',
    price: 5.75,
    sizeNote: '12 oz',
  },
];

export const ROAST_BEANS: RoastBean[] = [
  {
    id: 'chicon-espresso',
    name: 'Chicon House Espresso',
    origin: 'Colombia Huila & Brazil Mogiana',
    process: 'Washed & Natural Blend',
    roastLevel: 'Medium',
    tastingNotes: 'Toasted pecan, dark cacao, brown sugar',
    price12oz: 18,
    price2lb: 44,
    roastSchedule: 'Roasted Tuesdays & Fridays',
  },
  {
    id: 'ethiopia-uraga',
    name: 'Ethiopia Uraga Highland',
    origin: 'Guji Zone, Ethiopia (2,150m)',
    process: 'Washed Heirloom',
    roastLevel: 'Light-Medium',
    tastingNotes: 'Bergamot, white peach, jasmine tea',
    price12oz: 21,
    price2lb: 50,
    roastSchedule: 'Roasted Tuesdays',
  },
  {
    id: 'colombia-pink-bourbon',
    name: 'Finca El Mirador Pink Bourbon',
    origin: 'Acevedo, Huila, Colombia',
    process: 'Yellow Honey',
    roastLevel: 'Light',
    tastingNotes: 'Blood orange, panela, crisp red berry',
    price12oz: 22,
    price2lb: 52,
    roastSchedule: 'Roasted Fridays',
  },
  {
    id: 'chiapas-decaf',
    name: 'Chiapas Mountain Water Decaf',
    origin: 'Sierra Madre, Mexico',
    process: 'Mountain Water Process',
    roastLevel: 'Medium',
    tastingNotes: 'Milk chocolate, toasted almond, plum',
    price12oz: 18,
    price2lb: 44,
    roastSchedule: 'Roasted Wednesdays',
  },
];

export const AUSTIN_DELIVERY_ZIPS: Record<string, string> = {
  '78702': 'East Austin · Same-day bike drop (orders before 11 AM)',
  '78701': 'Downtown Austin · Next-morning courier route',
  '78703': 'Clarksville & Tarrytown · Next-morning courier route',
  '78704': 'South Congress & Zilker · Wednesday & Saturday van route',
  '78705': 'Central Austin & UT · Next-morning courier route',
  '78721': 'MLK & Springdale · Same-day bike drop (orders before 11 AM)',
  '78722': 'Cherrywood & Manor Rd · Same-day bike drop (orders before 11 AM)',
  '78723': 'Mueller & Windsor Park · Wednesday & Saturday van route',
  '78741': 'East Riverside · Wednesday & Saturday van route',
  '78751': 'Hyde Park & North Loop · Wednesday & Saturday van route',
};

export const FREE_DELIVERY_THRESHOLD = 35;
export const STANDARD_LOCAL_FEE = 5;
