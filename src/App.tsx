import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Utensils,
  X,
} from 'lucide-react';

// --- Types & Helper Functions ---
interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

const item = (name: string, price: number, description: string, image: string): MenuItem => ({
  name,
  price,
  description,
  image,
});

const whatsappNumber = '9779709105218';
const reserveLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Lunzi Keji, I would like to reserve a table.')}`;

const img = {
  // Beer
  gorkhaStrong: 'https://images.pexels.com/photos/24389563/pexels-photo-24389563.jpeg?_gl=1*1cohvxy*_ga*NjI2MDgyODUuMTc4ODQ5ODcxMg..*_ga_8JE65Q40S6*czE3ODkxNzgyMTkkbzIkZzEkdDE3ODkxNzgzMTMkajYwJGwwJGgw',
  gorkhaPilsner: 'https://images.pexels.com/photos/1267682/pexels-photo-1267682.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  gorkhaCraft: 'https://images.pexels.com/photos/5537929/pexels-photo-5537929.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  turboBeer: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  glacierBeer: 'https://images.pexels.com/photos/1672304/pexels-photo-1672304.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Milkshakes & Lassi
  chocoShake: 'https://images.pexels.com/photos/18142621/pexels-photo-18142621.jpeg?_gl=1*tpjwlo*_ga*NjI2MDgyODUuMTc4ODQ5ODcxMg..*_ga_8JE65Q40S6*czE3ODkxNzgyMTkkbzIkZzEkdDE3ODkxNzgzODckajU1JGwwJGgw',
  strawberryShake: 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  vanillaShake: 'https://images.pexels.com/photos/33694865/pexels-photo-33694865.jpeg?_gl=1*1wka7qm*_ga*NjI2MDgyODUuMTc4ODQ5ODcxMg..*_ga_8JE65Q40S6*czE3ODkxNzgyMTkkbzIkZzEkdDE3ODkxNzg1NjUkajIzJGwwJGgw',
  oreoShake: 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  plainLassi: 'https://images.pexels.com/photos/18142603/pexels-photo-18142603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  bananaLassi: 'https://images.pexels.com/photos/18142611/pexels-photo-18142611.jpeg?_gl=1*nub7k5*_ga*NjI2MDgyODUuMTc4ODQ5ODcxMg..*_ga_8JE65Q40S6*czE3ODkxNzgyMTkkbzIkZzEkdDE3ODkxNzg2MzMkajQ0JGwwJGgw',

  // Ice Cream
  vanillaIce: 'https://images.pexels.com/photos/8104733/pexels-photo-8104733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  strawIce: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYmcMr1o3eW9n6xGR0G472DvdnLHdxLin5xZGBjd0Eb0OAi5iW3nr_6GGn189VHKFfLBkRf6nYIR40ZC_SlRHeJHAQ3YLG583CkmpeYQ&s=10',
  chocoIce: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Coffee & Tea
  masalaChai: 'https://images.pexels.com/photos/36662612/pexels-photo-36662612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  blackTea: 'https://cdn.shopify.com/s/files/1/0022/1393/7252/articles/20221114103112-dark-tea-recipe-blog_2048x2048_crop_center.jpg.webp?v=1668422229',
  lemonTea: 'https://images.pexels.com/photos/27489187/pexels-photo-27489187.jpeg?_gl=1*ggs95i*_ga*NjI2MDgyODUuMTc4ODQ5ODcxMg..*_ga_8JE65Q40S6*czE3ODkxNzgyMTkkbzIkZzEkdDE3ODkxNzg5NDgkajMxJGwwJGgw',
  greenTea: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  espresso: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFi1ZYCnjnZjbE2XrYUkjNVvQ2vRwYQeAXEbtuE5laSA&s=10',
  americano: 'https://images.pexels.com/photos/6830390/pexels-photo-6830390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  latte: 'https://images.pexels.com/photos/459489/pexels-photo-459489.jpeg?_gl=1*10omtap*_ga*NjI2MDgyODUuMTc4ODQ5ODcxMg..*_ga_8JE65Q40S6*czE3ODkxNzgyMTkkbzIkZzEkdDE3ODkxNzkyMTEkajUyJGwwJGgw',
  cappuccino: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Cold Drinks & Special Drinks
  cola: 'https://images.pexels.com/photos/4113632/pexels-photo-4113632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  fanta: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sprite: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfqr9tcno0zXUIQXU69awTB-4GBE9YuwCKv5XcCRIRlg&s=10',
  sodaFloat: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  lemonade: 'https://images.pexels.com/photos/33107433/pexels-photo-33107433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mojito: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hotChoco: 'https://images.pexels.com/photos/867470/pexels-photo-867470.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Iced Coffee
  icedCoffee: 'https://images.pexels.com/photos/4869290/pexels-photo-4869290.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  icedTea: 'https://www.torani.com/media/catalog/product/l/e/lemon_iced_tea.jpg?optimize=medium&fit=bounds&height=815&width=650&canvas=650:815',

  // Momo & Dumplings
  chickenMomo: 'https://images.pexels.com/photos/27039841/pexels-photo-27039841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  porkMomo: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Noodles
  coldNoodles: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  porkNoodles: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  spicyNoodles: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  soupNoodles: 'https://images.pexels.com/photos/10950869/pexels-photo-10950869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Rice
  plainRice: 'https://images.pexels.com/photos/28503589/pexels-photo-28503589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  eggFriedRice: 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beefRice: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  chickenRice: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  lambRice: 'https://images.pexels.com/photos/6210876/pexels-photo-6210876.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Mains (Pork, Beef, Chicken, Fish)
  crispyPork: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cauliflowerPork: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  garlicPork: 'https://images.pexels.com/photos/8892348/pexels-photo-8892348.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  porkBelly: 'https://images.pexels.com/photos/8408373/pexels-photo-8408373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  duckDish: 'https://images.pexels.com/photos/5848598/pexels-photo-5848598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mushroomDish: 'https://images.pexels.com/photos/15797936/pexels-photo-15797936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  springRoll: 'https://images.pexels.com/photos/34767648/pexels-photo-34767648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tomatoEgg: 'https://images.pexels.com/photos/29529570/pexels-photo-29529570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  greenPepper: 'https://images.pexels.com/photos/8999040/pexels-photo-8999040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beefStirFry: 'https://images.pexels.com/photos/2365946/pexels-photo-2365946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  boiledBeef: 'https://images.pexels.com/photos/28668517/pexels-photo-28668517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hotPot: 'https://images.pexels.com/photos/30915727/pexels-photo-30915727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  squid: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sweetFish: 'https://images.pexels.com/photos/36694551/pexels-photo-36694551.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  friedFish: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  seafood: 'https://images.pexels.com/photos/30946366/pexels-photo-30946366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mapoTofu: 'https://images.pexels.com/photos/34618075/pexels-photo-34618075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  greenBeans: 'https://images.pexels.com/photos/9949171/pexels-photo-9949171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sweetPorkRibs: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  spicyChicken: 'https://images.pexels.com/photos/6705486/pexels-photo-6705486.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  chickenWings: 'https://images.pexels.com/photos/9650084/pexels-photo-9650084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kungPao: 'https://images.pexels.com/photos/30708204/pexels-photo-30708204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  garlicVeg: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beefSalad: 'https://images.pexels.com/photos/9218761/pexels-photo-9218761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Specials
  sushi: 'https://images.pexels.com/photos/31225297/pexels-photo-31225297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  deluxeSeafood: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',

  // Gallery & Ambience Images
  interior: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  outdoor: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  privateroom: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  outdoor2: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior2: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  privateroom2: 'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  noodles: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

const menuCategories: MenuCategory[] = [
  {
    name: 'Beer',
    items: [
      item('Gorkha Strong (250ml)', 550, 'Cold, crisp and poured for the perfect table start.', img.gorkhaStrong),
      item('Gorkha Pilsner (650ml)', 590, 'A clean, golden pour with a soft, bready finish.', img.gorkhaPilsner),
      item('Gorkha Craft (250ml)', 620, 'Small-batch character with a confident hop bite.', img.gorkhaCraft),
      item('Turbo (650ml)', 650, 'Full-bodied and strong, built for long evenings.', img.turboBeer),
      item('Glacier (650ml)', 720, 'Smooth, chilled and effortlessly refreshing.', img.glacierBeer),
    ],
  },
  {
    name: 'Milkshakes & Lassi',
    items: [
      item('Chocolate Milkshake', 370, 'Silken, chilled and made to order.', img.chocoShake),
      item('Strawberry Milkshake', 370, 'Creamy, fruit-forward and generously poured.', img.strawberryShake),
      item('Vanilla Milkshake', 370, 'A classic, velvet-smooth pour.', img.vanillaShake),
      item('Oreo Milkshake', 380, 'Crushed cookies folded through thick cream.', img.oreoShake),
      item('Plain Lassi', 220, 'Cool, tangy yoghurt whipped to order.', img.plainLassi),
      item('Banana Lassi', 250, 'Sweet, frothy and gently spiced.', img.bananaLassi),
    ],
  },
  {
    name: 'Ice Cream',
    items: [
      item('Vanilla', 300, 'A cool, creamy finish to an unhurried meal.', img.vanillaIce),
      item('Strawberry', 300, 'Soft, fruit-laced and delicately sweet.', img.strawIce),
      item('Chocolate', 350, 'Rich, dark and deeply comforting.', img.chocoIce),
    ],
  },
  {
    name: 'Hot Coffee & Tea',
    items: [
      item('Masala Milk Tea', 125, 'Warm, fragrant and served with quiet ceremony.', img.masalaChai),
      item('Black Tea', 100, 'Simple, strong and freshly steeped.', img.blackTea),
      item('Lemon Tea', 115, 'Bright, citrus-laced and restorative.', img.lemonTea),
      item('Green Tea', 125, 'Light, grassy and gently cleansing.', img.greenTea),
      item('Espresso (Single)', 160, 'A short, intense jolt of dark roast.', img.espresso),
      item('Espresso (Double)', 200, 'Twice the depth, same focused pour.', img.espresso),
      item('Americano (Single)', 200, 'Long, smooth and unhurried.', img.americano),
      item('Americano (Double)', 230, 'A taller, richer version of the classic.', img.americano),
      item('Latte', 250, 'Silky steamed milk over a gentle shot.', img.latte),
      item('Cappuccino', 250, 'Foam, warmth and a quiet morning ritual.', img.cappuccino),
    ],
  },
  {
    name: 'Cold Drinks',
    items: [
      item('Coca-Cola', 145, 'Refreshing classics, served chilled.', img.cola),
      item('Fanta', 145, 'Bright, orange and unmistakably fizzy.', img.fanta),
      item('Sprite', 145, 'Crisp, lemon-lime and ice-cold.', img.sprite),
      item('Plain Soda', 145, 'Simple, sparkling and clean.', img.cola),
      item('Soda with Ice Cream', 150, 'A float — nostalgic and sweet.', img.sodaFloat),
    ],
  },
  {
    name: 'Special Drinks',
    items: [
      item('Hot Lemon', 275, 'Bright, layered and finished with seasonal detail.', img.lemonTea),
      item('Hot Lemon Honey Ginger', 285, 'Soothing, warming and deeply restorative.', img.lemonTea),
      item('Hot Chocolate', 350, 'Rich, dark and poured like velvet.', img.hotChoco),
      item('Classic Lemonade', 250, 'Tart, sweet and freshly squeezed.', img.lemonade),
      item('Mint Lemonade', 280, 'Cool, green and quietly energising.', img.mojito),
      item('Strawberry Lemonade', 280, 'Fruity, pink and playfully tart.', img.lemonade),
      item('Fresh Lime Soda', 250, 'Zesty, sparkling and instantly refreshing.', img.sprite),
      item('Coconut Kiss', 350, 'Creamy, tropical and softly sweet.', img.vanillaShake),
      item('Virgin Mojito', 280, 'Muddled mint, lime and a long, cool finish.', img.mojito),
      item('Seasonal Fruit Juice', 350, 'Pressed fresh from the morning market.', img.lemonade),
    ],
  },
  {
    name: 'Iced Coffee & Tea',
    items: [
      item('Iced Americano', 280, 'Cool pours for Kathmandu afternoons.', img.icedCoffee),
      item('Iced Cappuccino', 300, 'Chilled, frothy and lightly sweetened.', img.icedCoffee),
      item('Iced Latte', 300, 'Cold milk, smooth espresso and ice.', img.icedCoffee),
      item('Breezy Iced Tea', 280, 'Light, fruity and effortlessly cool.', img.icedTea),
      item('Lemon Iced Tea', 280, 'Citrus-bright and deeply refreshing.', img.icedTea),
    ],
  },
  {
    name: 'Momo',
    items: [
      item('Chicken Momo', 350, 'Hand-folded parcels, steamed and served with house sauce.', img.chickenMomo),
      item('Pork Momo', 400, 'Juicy pork filling wrapped in silken dough.', img.porkMomo),
    ],
  },
  {
    name: 'Noodles',
    items: [
      item('Cold Noodles', 450, 'Wok-tossed noodles with depth, heat and silk.', img.coldNoodles),
      item('Pork Noodles', 599, 'Rich pork and noodles in a deeply savoury sauce.', img.porkNoodles),
      item('Spicy Noodles', 450, 'Chilli-laced noodles with a lingering warmth.', img.spicyNoodles),
      item('Spicy Pork Noodles', 500, 'Pork, heat and texture in every bite.', img.spicyNoodles),
      item('Egg & Veg Soup Noodles', 590, 'A comforting bowl with broth, egg and greens.', img.soupNoodles),
    ],
  },
  {
    name: 'Rice',
    items: [
      item('Plain Rice', 80, 'Fragrant grains carrying the flavour of the wok.', img.plainRice),
    ],
  },
  {
    name: 'Signature Main Course',
    items: [
      item('Salt Roasted Wild Pork', 780, 'Crackling skin, tender meat and a whisper of salt.', img.crispyPork),
      item('Dry Fried Cauliflower with Pork', 750, 'Charred florets and pork in a dry, spicy glaze.', img.cauliflowerPork),
      item('Cashew Tofu with Pork/Beef', 850, 'Silken tofu, toasted cashews and your choice of protein.', img.mapoTofu),
      item('Garlic Pork Belly', 660, 'Slow-cooked belly with a golden garlic crust.', img.garlicPork),
      item('Twice Cooked Pork', 680, 'Sichuan classic — blazed twice for intensity.', img.porkBelly),
      item('Dry Pot Ginger Duck', 1980, 'Ginger, duck and dry-pot heat for a celebratory table.', img.duckDish),
      item('Mushroom Variety', 690, 'A forest of mushrooms, wok-tossed and earthy.', img.mushroomDish),
      item('Delicious Spring Roll', 250, 'Golden, crisp and freshly fried to order.', img.springRoll),
      item('Tomato & Egg Stir Fry', 650, 'A humble Chinese home classic, done right.', img.tomatoEgg),
      item('Preserved Egg with Roasted Chili', 650, 'Century egg and roasted chilli — bold and traditional.', img.greenPepper),
      item('Beef in Brown Sauce', 1400, 'Deep, dark and deeply satisfying.', img.beefStirFry),
      item('Boiled Beef', 1380, 'Tender beef in a fiery, oil-slicked broth.', img.boiledBeef),
      item('Steamed Soup Hot Pot', 2200, 'A centrepiece pot for the whole table.', img.hotPot),
      item('River Snails Spicy Stir Fry', 880, 'Adventurous, spicy and unmistakably Chinese.', img.spicyChicken),
      item('Squid & Seafood', 2200, 'Fresh squid and seafood, wok-seared with heat.', img.squid),
      item('Spicy Lamb', 890, 'Cumin, chilli and tender lamb in a dry rub.', img.lambRice),
      item('Dry Braised Fish', 1500, 'Crisp-skinned fish in a deeply savoury glaze.', img.friedFish),
      item('Sweet & Sour Fish', 1680, 'Whole fish in a glossy, tangy-sweet sauce.', img.sweetFish),
      item('Boneless Fish', 890, 'Soft, flaky fish — no bones, all flavour.', img.friedFish),
      item('Boneless Pork', 750, 'Tender pork strips, easy to share.', img.porkBelly),
      item('Golden Wood Seafood', 990, 'A bright, textured seafood stir-fry.', img.seafood),
      item('Pork with Ginger Special Sauce', 2800, 'Our signature — slow-cooked, ginger-warm and generous.', img.garlicPork),
      item('Spicy Beef', 850, 'Chilli oil, Sichuan pepper and wok-charred beef.', img.beefStirFry),
      item('Tomato Beef', 550, 'Tender beef simmered in a sweet tomato sauce.', img.beefStirFry),
      item('Beef Salad', 750, 'Cool greens, seared beef and a bright dressing.', img.beefSalad),
      item('Dry Pot Beef', 650, 'Beef, peppers and dry-pot intensity.', img.beefStirFry),
      item('Dry Tofu with Seared Pork', 850, 'Firm tofu and crisp-edged pork.', img.mapoTofu),
      item('Spicy Pork', 800, 'Pork, chilli and a confident wok char.', img.spicyChicken),
      item('Mapo Tofu with Minced Pork', 650, 'Silken tofu in a fiery, numbing sauce.', img.mapoTofu),
      item('Green Beans with Minced Pork', 650, 'Blistered beans and savoury minced pork.', img.greenBeans),
      item('Spicy Cold Chicken Salad', 730, 'Cool chicken, chilli oil and crunch.', img.beefSalad),
      item('Fried Mushroom with Pork', 890, 'Crisp mushrooms and pork, wok-tossed together.', img.mushroomDish),
      item('Sweet & Sour Pork Ribs', 780, 'Glossy ribs with a tangy-sweet lacquer.', img.sweetPorkRibs),
      item('Mushroom Chicken', 850, 'Earthy mushrooms and tender chicken.', img.mushroomDish),
      item('Spicy Chicken', 700, 'Dry-fried chicken with chilli and Sichuan pepper.', img.spicyChicken),
      item('Crispy Fried Chicken Wings', 760, 'Golden, crackling wings with a salt-and-pepper dust.', img.chickenWings),
      item('Lemon Pan Fried Fish', 850, 'Pan-seared fish with a bright lemon finish.', img.friedFish),
      item('Seared Chicken', 700, 'Clean, golden-seared chicken with a light sauce.', img.chickenRice),
      item('Kung Pao Chicken', 790, 'The Sichuan classic — chicken, peanuts and dried chilli.', img.kungPao),
      item('Tiger Skin Green Pepper', 460, 'Blistered green peppers with a smoky char.', img.greenPepper),
      item('Spicy Tofu', 650, 'Firm tofu in a bold, chilli-laced sauce.', img.mapoTofu),
      item('Garlic Sauce Vegetables', 590, 'Seasonal greens in a fragrant garlic sauce.', img.garlicVeg),
    ],
  },
  {
    name: 'Premium Specials',
    items: [
      item('Salmon Sushi (Small)', 3500, 'Celebratory centrepieces for the table.', img.sushi),
      item('Salmon Sushi (Large)', 5880, 'An abundant platter for a special occasion.', img.sushi),
      item('Deluxe Seafood Platter', 7880, 'The grandest expression of our kitchen.', img.deluxeSeafood),
    ],
  },
];

const galleryImages = [
  { src: img.interior, label: 'Interior', title: 'The Lunzi Keji welcome' },
  { src: img.outdoor, label: 'Outdoor', title: 'A garden above the city' },
  { src: img.privateroom, label: 'Private Room', title: 'A room for your people' },
  { src: img.kungpao, label: 'Food', title: 'Hand-folded classics' },
  { src: img.outdoor2, label: 'Ambience', title: 'Light, water, and stillness' },
  { src: img.interior2, label: 'Interior', title: 'Warm walnut and lantern light' },
  { src: img.noodles, label: 'Food', title: 'The theatre of the wok' },
  { src: img.privateroom2, label: 'Private Room', title: 'Set for a celebration' },
];

const reviews = [
  { quote: 'A beautiful space with genuinely warm service. The private room made our family dinner feel incredibly special.', name: 'Roshni K.', detail: 'Family celebration' },
  { quote: 'The food is thoughtful, generous and full of character. We stayed for hours and never felt rushed.', name: 'Aayush M.', detail: 'Local guide' },
  { quote: 'One of Kathmandu’s most memorable dining rooms. The terrace, the koi pond, the hospitality — all exceptional.', name: 'Maya S.', detail: 'Business dinner' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Signature Main Course');
  const [activeGallery, setActiveGallery] = useState<typeof galleryImages[number] | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const activeItems = useMemo(() => menuCategories.find((category) => category.name === activeCategory)?.items ?? [], [activeCategory]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => scrollTo('home')}>
          <span className="brand-mark"><Utensils size={18} /></span>
          <span><strong>LUNZI KEJI</strong><small>RESTAURANT · KATHMANDU</small></span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {['home', 'about', 'menu', 'gallery', 'private-dining', 'reviews', 'contact'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}>{id === 'private-dining' ? 'Private Dining' : id[0].toUpperCase() + id.slice(1)}</button>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href="tel:+9779709105218"><Phone size={15} /> <span>+977 9709105218</span></a>
          <a className="button button-gold button-small" href={reserveLink} target="_blank" rel="noreferrer">Reserve <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? <X /> : <MenuIcon />}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-vignette" />
          <div className="hero-content page-width">
            <p className="eyebrow light">Gahana Pokhari · Kathmandu · Since 2018</p>
            <h1>Authentic Chinese<br /><em>Fine Dining</em> Experience</h1>
            <p className="hero-copy">Elegant private dining, outdoor terrace, handcrafted cuisine, and unforgettable hospitality in the heart of Kathmandu.</p>
            <div className="hero-buttons"><button className="button button-gold" onClick={() => scrollTo('menu')}>Explore the menu <ArrowUpRight size={17} /></button><a className="button button-ghost" href={reserveLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Reserve via WhatsApp</a></div>
            <div className="hero-note"><span className="line" /> <span>Chinese cuisine · Nepali hospitality</span></div>
          </div>
          <div className="hero-scroll">Scroll to discover <span className="scroll-line" /></div>
        </section>

        <section className="intro section-padding page-width" id="about">
          <div className="section-kicker">01 / The Lunzi Keji story</div>
          <div className="intro-grid">
            <div><p className="eyebrow">A table above the ordinary</p><h2>Where every detail<br /><em>sets the mood.</em></h2></div>
            <div className="intro-text"><p>At Lunzi Keji, dining is an invitation to slow down. Our kitchen brings the bold, layered flavours of China to a warm Kathmandu setting, where every plate is made for sharing and every room has its own rhythm.</p><p>Come for an intimate dinner, a long family lunch, or a celebration under the lanterns. Stay for the feeling of having found somewhere quietly unforgettable.</p><button className="text-link" onClick={() => scrollTo('private-dining')}>Discover private dining <ArrowUpRight size={17} /></button></div>
          </div>
          <div className="stats-row"><div className="stat"><span className="stat-value">4.2<span className="gold">★</span></span><span>Google rating</span></div><div className="stat"><span className="stat-value">20<span className="gold">+</span></span><span>Verified reviews</span></div><div className="stat"><span className="stat-value">8–12</span><span>Private dining guests</span></div><div className="stat"><span className="stat-value">10–10</span><span>Open daily</span></div></div>
        </section>

        <section className="experience-strip"><div className="experience-image" /><div className="experience-panel"><p className="eyebrow">A room with a story</p><h2>Firelight, silk,<br /><em>and shared plates.</em></h2><p>Warm walnut, soft lantern light, and a little bit of theatre. Our spaces are designed to make an ordinary evening feel like an occasion.</p><div className="experience-list"><span>01 / Fireplace ambience</span><span>02 / Outdoor terrace</span><span>03 / Private celebrations</span></div></div></section>

        <section className="menu-section section-padding page-width" id="menu">
          <div className="section-heading"><div><div className="section-kicker">02 / From our kitchen</div><p className="eyebrow">Digital menu</p><h2>A menu made for<br /><em>the whole table.</em></h2></div><p className="section-intro">Browse our collection of Chinese classics, considered drinks and celebratory centrepieces. Our menu is for browsing only — please reserve your table with us directly.</p></div>
          <div className="category-tabs">{menuCategories.map((category) => <button key={category.name} className={category.name === activeCategory ? 'active' : ''} onClick={() => setActiveCategory(category.name)}>{category.name}</button>)}</div>
          <div className="menu-caption"><span>{activeCategory}</span><span>{activeItems.length} selections</span></div>
          <div className="menu-grid">{activeItems.map((menuItem) => <article className="menu-card" key={menuItem.name}><div className="menu-card-image"><img src={menuItem.image} alt={menuItem.name} loading="lazy" /></div><div className="menu-card-body"><div className="menu-card-title"><h3>{menuItem.name}</h3><span>Rs. {menuItem.price.toLocaleString('en-IN')}</span></div><p>{menuItem.description}</p></div></article>)}</div>
        </section>

        <section className="gallery-section section-padding page-width" id="gallery">
          <div className="section-heading"><div><div className="section-kicker">03 / A sense of place</div><p className="eyebrow">Gallery</p><h2>Come for the<br /><em>atmosphere.</em></h2></div><p className="section-intro">A house of many moods — from the lantern-lit terrace to the quiet glow of our private dining room.</p></div>
          <div className="gallery-grid">{galleryImages.map((image, index) => <button className={`gallery-item gallery-${index + 1}`} key={`${image.src}-${index}`} onClick={() => setActiveGallery(image)}><img src={image.src} alt={image.title} loading="lazy" /><span className="gallery-overlay"><small>{image.label}</small><strong>{image.title}</strong></span></button>)}</div>
        </section>

        <section className="private-section" id="private-dining"><div className="private-image" /><div className="private-content"><div className="section-kicker">04 / Gather well</div><p className="eyebrow">Private dining</p><h2>Your table,<br /><em>your occasion.</em></h2><p>The round table room is made for the moments that deserve a little more space. Bring your closest people, your big news, or simply your appetite.</p><div className="private-details"><div><strong>8–12</strong><span>Guests</span></div><div><strong>04</strong><span>Occasions</span></div><div><strong>01</strong><span>Beautiful room</span></div></div><a className="button button-gold" href={reserveLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Book via WhatsApp <ArrowUpRight size={17} /></a></div></section>

        <section className="team-section section-padding page-width" id="team"><div className="section-kicker">05 / The people behind the table</div><div className="section-heading"><div><p className="eyebrow">Our team</p><h2>Warm hands,<br /><em>quiet craft.</em></h2></div><p className="section-intro">From the first welcome to the final pour, our team believes hospitality is an art of noticing.</p></div><div className="team-grid"><article className="team-card"><div className="team-avatar team-avatar-1">LK</div><p className="eyebrow">Head Chef</p><h3>Chef Lunzi Keji</h3><p>Rooted in traditional Chinese technique, with a generous Kathmandu spirit.</p></article><article className="team-card"><div className="team-avatar team-avatar-2">SC</div><p className="eyebrow">Chef de Cuisine</p><h3>Chef Suresh Chhetri</h3><p>Bringing balance, precision and a little fire to every service.</p></article><article className="team-card"><div className="team-avatar team-avatar-3">AM</div><p className="eyebrow">Guest Experience</p><h3>Anisha Maharjan</h3><p>Making every gathering feel like it has been expected all along.</p></article></div></section>

        <section className="reviews-section section-padding" id="reviews"><div className="page-width"><div className="reviews-top"><div><div className="section-kicker">06 / In good company</div><p className="eyebrow">Guest notes</p><h2>Good food leaves<br /><em>a warm echo.</em></h2></div><div className="rating-lockup"><span>4.2</span><div><div className="stars">★★★★★</div><small>Google rating · 20+ reviews</small></div></div></div><div className="review-card"><div className="quote-mark">“</div><blockquote>{reviews[reviewIndex].quote}</blockquote><div className="review-author"><span className="author-dot">{reviews[reviewIndex].name.charAt(0)}</span><span><strong>{reviews[reviewIndex].name}</strong><small>{reviews[reviewIndex].detail}</small></span></div><div className="review-controls"><button onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)} aria-label="Previous review"><ChevronLeft /></button><span>0{reviewIndex + 1} <i>/ 0{reviews.length}</i></span><button onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)} aria-label="Next review"><ChevronRight /></button></div></div></div></section>

        <section className="contact-section section-padding page-width" id="contact"><div className="contact-grid"><div><div className="section-kicker">07 / Find your way here</div><p className="eyebrow">Contact & reservations</p><h2>Let’s make<br /><em>an evening of it.</em></h2><p className="contact-copy">For reservations, celebrations or any questions, our team is ready to help.</p><div className="contact-details"><div><MapPin size={18} /><span>Gahana Pokhari–05<br />Kathmandu, Nepal</span></div><div><Phone size={18} /><a href="tel:+9779709105218">+977 9709105218</a></div><div><Clock3 size={18} /><span>Open daily<br />10:00 AM – 10:00 PM</span></div></div><div className="contact-actions"><a className="button button-gold" href={reserveLink} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp reservation</a><a className="button button-outline" href="tel:+9779709105218"><Phone size={17} /> Call us</a></div></div><form className="contact-form" onSubmit={handleSubmit}><p className="eyebrow">Send an enquiry</p><label>Your name<input name="name" required placeholder="How should we call you?" /></label><label>Email or phone<input name="contact" required placeholder="Your preferred contact" /></label><label>Message<textarea name="message" required rows={4} placeholder="Tell us about your occasion..." /></label><button className="button button-dark" type="submit">{formSent ? 'Thank you — we’ll be in touch' : 'Send enquiry'} <ArrowUpRight size={17} /></button></form></div><div className="map-card"><div className="map-grid-lines" /><MapPin size={30} /><div><strong>Gahana Pokhari–05</strong><span>Find us in the heart of Kathmandu</span></div><a href="https://www.google.com/maps/search/?api=1&query=Lunzi+Keji+Restaurant+Kathmandu" target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={15} /></a></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-grid"><div className="brand footer-brand"><span className="brand-mark"><Utensils size={18} /></span><span><strong>LUNZI KEJI</strong><small>RESTAURANT · KATHMANDU</small></span></div><p>Chinese fine dining<br />with a Kathmandu soul.</p><div className="footer-links"><button onClick={() => scrollTo('menu')}>Menu</button><button onClick={() => scrollTo('private-dining')}>Private Dining</button><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a></div></div><div className="page-width footer-bottom"><span>© 2026 Lunzi Keji Restaurant</span><span>Gahana Pokhari–05, Kathmandu</span></div></footer>

      {activeGallery && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image" onClick={() => setActiveGallery(null)}><button className="lightbox-close" onClick={() => setActiveGallery(null)} aria-label="Close gallery"><X /></button><img src={activeGallery.src} alt={activeGallery.title} onClick={(event) => event.stopPropagation()} /><div className="lightbox-caption"><small>{activeGallery.label}</small><strong>{activeGallery.title}</strong></div></div>}
    </div>
  );
}
