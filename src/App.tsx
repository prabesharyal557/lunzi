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

const whatsappNumber = '9779709105218';
const reserveLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Lunzi Keji, I would like to reserve a table.')}`;

const img = {
  dumplings: 'https://images.pexels.com/photos/27039841/pexels-photo-27039841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  noodles: 'https://images.pexels.com/photos/10950869/pexels-photo-10950869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  rice: 'https://images.pexels.com/photos/28503589/pexels-photo-28503589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  szechuan: 'https://images.pexels.com/photos/6705486/pexels-photo-6705486.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beef: 'https://images.pexels.com/photos/28668517/pexels-photo-28668517.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kungpao: 'https://images.pexels.com/photos/30708204/pexels-photo-30708204.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  porkbelly: 'https://images.pexels.com/photos/8408373/pexels-photo-8408373.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  garlicpork: 'https://images.pexels.com/photos/8892348/pexels-photo-8892348.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sushi: 'https://images.pexels.com/photos/31225297/pexels-photo-31225297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cappuccino: 'https://images.pexels.com/photos/6747870/pexels-photo-6747870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  milkshake: 'https://images.pexels.com/photos/32469289/pexels-photo-32469289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hookah: 'https://images.pexels.com/photos/16978577/pexels-photo-16978577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  lemonade: 'https://images.pexels.com/photos/33107433/pexels-photo-33107433.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  icecream: 'https://images.pexels.com/photos/8104733/pexels-photo-8104733.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  cola: 'https://images.pexels.com/photos/4113632/pexels-photo-4113632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  hotpot: 'https://images.pexels.com/photos/30915727/pexels-photo-30915727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  wings: 'https://images.pexels.com/photos/9650084/pexels-photo-9650084.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  sweetfish: 'https://images.pexels.com/photos/36694551/pexels-photo-36694551.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  springroll: 'https://images.pexels.com/photos/34767648/pexels-photo-34767648.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  greenbeans: 'https://images.pexels.com/photos/9949171/pexels-photo-9949171.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beefstirfry: 'https://images.pexels.com/photos/2365946/pexels-photo-2365946.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mapotofu: 'https://images.pexels.com/photos/34618075/pexels-photo-34618075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  mushroom: 'https://images.pexels.com/photos/15797936/pexels-photo-15797936.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  duck: 'https://images.pexels.com/photos/5848598/pexels-photo-5848598.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  seafood: 'https://images.pexels.com/photos/30946366/pexels-photo-30946366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  icedcoffee: 'https://images.pexels.com/photos/4869290/pexels-photo-4869290.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  beer: 'https://images.pexels.com/photos/19106394/pexels-photo-19106394.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  lassi: 'https://images.pexels.com/photos/18142603/pexels-photo-18142603.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  chai: 'https://images.pexels.com/photos/36662612/pexels-photo-36662612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  salad: 'https://images.pexels.com/photos/9218761/pexels-photo-9218761.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tomatoegg: 'https://images.pexels.com/photos/29529570/pexels-photo-29529570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  greenpepper: 'https://images.pexels.com/photos/8999040/pexels-photo-8999040.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior: 'https://images.pexels.com/photos/26729398/pexels-photo-26729398.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  interior2: 'https://images.pexels.com/photos/27305319/pexels-photo-27305319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  outdoor: 'https://images.pexels.com/photos/18823963/pexels-photo-18823963.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  outdoor2: 'https://images.pexels.com/photos/18823969/pexels-photo-18823969.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  privateroom: 'https://images.pexels.com/photos/17109123/pexels-photo-17109123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  privateroom2: 'https://images.pexels.com/photos/12919158/pexels-photo-12919158.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

type MenuItem = { name: string; price: number; description: string; image: string };
type MenuCategory = { name: string; items: MenuItem[] };

const item = (name: string, price: number, description: string, image: string): MenuItem => ({ name, price, description, image });

const menuCategories: MenuCategory[] = [
  {
    name: 'Beer',
    items: [
      item('Gorkha Strong (250ml)', 550, 'Cold, crisp and poured for the perfect table start.', img.beer),
      item('Gorkha Pilsner (650ml)', 590, 'A clean, golden pour with a soft, bready finish.', img.beer),
      item('Gorkha Craft (250ml)', 620, 'Small-batch character with a confident hop bite.', img.beer),
      item('Turbo (650ml)', 650, 'Full-bodied and strong, built for long evenings.', img.beer),
      item('Glacier (650ml)', 720, 'Smooth, chilled and effortlessly refreshing.', img.beer),
    ],
  },
  {
    name: 'Milkshakes & Lassi',
    items: [
      item('Chocolate Milkshake', 370, 'Silken, chilled and made to order.', img.milkshake),
      item('Strawberry Milkshake', 370, 'Creamy, fruit-forward and generously poured.', img.milkshake),
      item('Vanilla Milkshake', 370, 'A classic, velvet-smooth pour.', img.milkshake),
      item('Oreo Milkshake', 380, 'Crushed cookies folded through thick cream.', img.milkshake),
      item('Plain Lassi', 220, 'Cool, tangy yoghurt whipped to order.', img.lassi),
      item('Banana Lassi', 250, 'Sweet, frothy and gently spiced.', img.lassi),
    ],
  },
  {
    name: 'Ice Cream',
    items: [
      item('Vanilla', 300, 'A cool, creamy finish to an unhurried meal.', img.icecream),
      item('Strawberry', 300, 'Soft, fruit-laced and delicately sweet.', img.icecream),
      item('Chocolate', 350, 'Rich, dark and deeply comforting.', img.icecream),
    ],
  },
  {
    name: 'Hookah',
    items: [
      item('Lady Killer', 1350, 'Aromatic house blends for long evenings outdoors.', img.hookah),
      item('101', 1150, 'A balanced, crowd-pleasing signature mix.', img.hookah),
      item('Mini Mint', 1150, 'Cool, clean and effortlessly fresh.', img.hookah),
      item('Blueberry', 1150, 'Sweet, fruity and softly aromatic.', img.hookah),
      item('Express Secret', 1150, 'A house blend we keep quietly under wraps.', img.hookah),
    ],
  },
  {
    name: 'Hot Coffee & Tea',
    items: [
      item('Masala Milk Tea', 125, 'Warm, fragrant and served with quiet ceremony.', img.chai),
      item('Black Tea', 100, 'Simple, strong and freshly steeped.', img.chai),
      item('Lemon Tea', 115, 'Bright, citrus-laced and restorative.', img.chai),
      item('Green Tea', 125, 'Light, grassy and gently cleansing.', img.chai),
      item('Espresso (Single)', 160, 'A short, intense jolt of dark roast.', img.cappuccino),
      item('Espresso (Double)', 200, 'Twice the depth, same focused pour.', img.cappuccino),
      item('Americano (Single)', 200, 'Long, smooth and unhurried.', img.cappuccino),
      item('Americano (Double)', 230, 'A taller, richer version of the classic.', img.cappuccino),
      item('Latte', 250, 'Silky steamed milk over a gentle shot.', img.cappuccino),
      item('Cappuccino', 250, 'Foam, warmth and a quiet morning ritual.', img.cappuccino),
    ],
  },
  {
    name: 'Cold Drinks',
    items: [
      item('Coca-Cola', 145, 'Refreshing classics, served chilled.', img.cola),
      item('Fanta', 145, 'Bright, orange and unmistakably fizzy.', img.cola),
      item('Sprite', 145, 'Crisp, lemon-lime and ice-cold.', img.cola),
      item('Plain Soda', 145, 'Simple, sparkling and clean.', img.cola),
      item('Soda with Ice Cream', 150, 'A float — nostalgic and sweet.', img.icecream),
    ],
  },
  {
    name: 'Special Drinks',
    items: [
      item('Hot Lemon', 275, 'Bright, layered and finished with seasonal detail.', img.lemonade),
      item('Hot Lemon Honey Ginger', 285, 'Soothing, warming and deeply restorative.', img.lemonade),
      item('Hot Chocolate', 350, 'Rich, dark and poured like velvet.', img.milkshake),
      item('Classic Lemonade', 250, 'Tart, sweet and freshly squeezed.', img.lemonade),
      item('Mint Lemonade', 280, 'Cool, green and quietly energising.', img.lemonade),
      item('Strawberry Lemonade', 280, 'Fruity, pink and playfully tart.', img.lemonade),
      item('Fresh Lime Soda', 250, 'Zesty, sparkling and instantly refreshing.', img.lemonade),
      item('Coconut Kiss', 350, 'Creamy, tropical and softly sweet.', img.lemonade),
      item('Virgin Mojito', 280, 'Muddled mint, lime and a long, cool finish.', img.lemonade),
      item('Seasonal Fruit Juice', 350, 'Pressed fresh from the morning market.', img.lemonade),
    ],
  },
  {
    name: 'Iced Coffee & Tea',
    items: [
      item('Iced Americano', 280, 'Cool pours for Kathmandu afternoons.', img.icedcoffee),
      item('Iced Cappuccino', 300, 'Chilled, frothy and lightly sweetened.', img.icedcoffee),
      item('Iced Latte', 300, 'Cold milk, smooth espresso and ice.', img.icedcoffee),
      item('Breezy Iced Tea', 280, 'Light, fruity and effortlessly cool.', img.icedcoffee),
      item('Lemon Iced Tea', 280, 'Citrus-bright and deeply refreshing.', img.icedcoffee),
    ],
  },
  {
    name: 'Momo',
    items: [
      item('Chicken Momo', 350, 'Hand-folded parcels, steamed and served with house sauce.', img.dumplings),
      item('Pork Momo', 400, 'Juicy pork filling wrapped in silken dough.', img.dumplings),
    ],
  },
  {
    name: 'Noodles',
    items: [
      item('Cold Noodles', 450, 'Wok-tossed noodles with depth, heat and silk.', img.noodles),
      item('Pork Noodles', 599, 'Rich pork and noodles in a deeply savoury sauce.', img.noodles),
      item('Spicy Noodles', 450, 'Chilli-laced noodles with a lingering warmth.', img.noodles),
      item('Spicy Pork Noodles', 500, 'Pork, heat and texture in every bite.', img.noodles),
      item('Egg & Veg Soup Noodles', 590, 'A comforting bowl with broth, egg and greens.', img.noodles),
    ],
  },
  {
    name: 'Rice',
    items: [
      item('Plain Rice', 80, 'Fragrant grains carrying the flavour of the wok.', img.rice),
      item('Egg Fried Rice', 250, 'Wok-charred rice folded with golden egg.', img.rice),
      item('Egg Fried Rice with Beef', 780, 'Hearty, beef-rich and deeply savoury.', img.rice),
      item('Chicken Rice Bowl', 700, 'A generous bowl built for one.', img.rice),
      item('Lamb Rice Bowl', 790, 'Tender lamb over fragrant rice.', img.rice),
      item('Kung Pao Chicken Rice', 690, 'Spiced chicken, peanuts and wok rice.', img.kungpao),
      item('Modern Rice Set', 890, 'A curated set for the curious table.', img.rice),
      item('Junior Meal Box Chicken', 680, 'A complete little box, built for younger guests.', img.rice),
    ],
  },
  {
    name: 'Signature Main Course',
    items: [
      item('Salt Roasted Wild Pork', 780, 'Crackling skin, tender meat and a whisper of salt.', img.porkbelly),
      item('Dry Fried Cauliflower with Pork', 750, 'Charred florets and pork in a dry, spicy glaze.', img.szechuan),
      item('Cashew Tofu with Pork/Beef', 850, 'Silken tofu, toasted cashews and your choice of protein.', img.mapotofu),
      item('Garlic Pork Belly', 660, 'Slow-cooked belly with a golden garlic crust.', img.garlicpork),
      item('Twice Cooked Pork', 680, 'Sichuan classic — blazed twice for intensity.', img.porkbelly),
      item('Dry Pot Ginger Duck', 1980, 'Ginger, duck and dry-pot heat for a celebratory table.', img.duck),
      item('Mushroom Variety', 690, 'A forest of mushrooms, wok-tossed and earthy.', img.mushroom),
      item('Delicious Spring Roll', 250, 'Golden, crisp and freshly fried to order.', img.springroll),
      item('Tomato & Egg Stir Fry', 650, 'A humble Chinese home classic, done right.', img.tomatoegg),
      item('Preserved Egg with Roasted Chili', 650, 'Century egg and roasted chilli — bold and traditional.', img.greenpepper),
      item('Beef in Brown Sauce', 1400, 'Deep, dark and deeply satisfying.', img.beefstirfry),
      item('Boiled Beef', 1380, 'Tender beef in a fiery, oil-slicked broth.', img.beef),
      item('Steamed Soup Hot Pot', 2200, 'A centrepiece pot for the whole table.', img.hotpot),
      item('River Snails Spicy Stir Fry', 880, 'Adventurous, spicy and unmistakably Chinese.', img.szechuan),
      item('Squid & Seafood', 2200, 'Fresh squid and seafood, wok-seared with heat.', img.seafood),
      item('Spicy Lamb', 890, 'Cumin, chilli and tender lamb in a dry rub.', img.beefstirfry),
      item('Dry Braised Fish', 1500, 'Crisp-skinned fish in a deeply savoury glaze.', img.sweetfish),
      item('Sweet & Sour Fish', 1680, 'Whole fish in a glossy, tangy-sweet sauce.', img.sweetfish),
      item('Boneless Fish', 890, 'Soft, flaky fish — no bones, all flavour.', img.sweetfish),
      item('Boneless Pork', 750, 'Tender pork strips, easy to share.', img.porkbelly),
      item('Golden Wood Seafood', 990, 'A bright, textured seafood stir-fry.', img.seafood),
      item('Pork with Ginger Special Sauce', 2800, 'Our signature — slow-cooked, ginger-warm and generous.', img.garlicpork),
      item('Spicy Beef', 850, 'Chilli oil, Sichuan pepper and wok-charred beef.', img.beefstirfry),
      item('Tomato Beef', 550, 'Tender beef simmered in a sweet tomato sauce.', img.beefstirfry),
      item('Beef Salad', 750, 'Cool greens, seared beef and a bright dressing.', img.salad),
      item('Dry Pot Beef', 650, 'Beef, peppers and dry-pot intensity.', img.beefstirfry),
      item('Dry Tofu with Seared Pork', 850, 'Firm tofu and crisp-edged pork.', img.mapotofu),
      item('Spicy Pork', 800, 'Pork, chilli and a confident wok char.', img.szechuan),
      item('Mapo Tofu with Minced Pork', 650, 'Silken tofu in a fiery, numbing sauce.', img.mapotofu),
      item('Green Beans with Minced Pork', 650, 'Blistered beans and savoury minced pork.', img.greenbeans),
      item('Spicy Cold Chicken Salad', 730, 'Cool chicken, chilli oil and crunch.', img.salad),
      item('Fried Mushroom with Pork', 890, 'Crisp mushrooms and pork, wok-tossed together.', img.mushroom),
      item('Sweet & Sour Pork Ribs', 780, 'Glossy ribs with a tangy-sweet lacquer.', img.porkbelly),
      item('Mushroom Chicken', 850, 'Earthy mushrooms and tender chicken.', img.mushroom),
      item('Spicy Chicken', 700, 'Dry-fried chicken with chilli and Sichuan pepper.', img.kungpao),
      item('Crispy Fried Chicken Wings', 760, 'Golden, crackling wings with a salt-and-pepper dust.', img.wings),
      item('Lemon Pan Fried Fish', 850, 'Pan-seared fish with a bright lemon finish.', img.sweetfish),
      item('Seared Chicken', 700, 'Clean, golden-seared chicken with a light sauce.', img.kungpao),
      item('Kung Pao Chicken', 790, 'The Sichuan classic — chicken, peanuts and dried chilli.', img.kungpao),
      item('Tiger Skin Green Pepper', 460, 'Blistered green peppers with a smoky char.', img.greenpepper),
      item('Spicy Tofu', 650, 'Firm tofu in a bold, chilli-laced sauce.', img.mapotofu),
      item('Garlic Sauce Vegetables', 590, 'Seasonal greens in a fragrant garlic sauce.', img.greenbeans),
    ],
  },
  {
    name: 'Premium Specials',
    items: [
      item('Salmon Sushi (Small)', 3500, 'Celebratory centrepieces for the table.', img.sushi),
      item('Salmon Sushi (Large)', 5880, 'An abundant platter for a special occasion.', img.sushi),
      item('Deluxe Seafood Platter', 7880, 'The grandest expression of our kitchen.', img.seafood),
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

function App() {
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

export default App;
