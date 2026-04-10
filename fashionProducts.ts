import mongoose from "mongoose";

// Replace these with actual IDs from your MongoDB collections!
const FASHION_CATEGORY_ID = new mongoose.Types.ObjectId(
  "69cfc91d6e518698a9fb0a85",
);
const SELLER_USER_ID = new mongoose.Types.ObjectId("69d7cb102f8f394b9149d410");

export const fashionProducts = [
  // --- SHIRTS & TOPS ---
  {
    name: "Classic White Oxford Shirt",
    description:
      "Premium 100% cotton oxford shirt. Perfect for formal and casual wear. Features a button-down collar and a tailored fit.",
    price: 1499,
    category: FASHION_CATEGORY_ID,
    stock: 45,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/mens,white,shirt?lock=1",
        public_id: "oxford-1",
      },
      {
        url: "https://loremflickr.com/320/240/mens,white,shirt?lock=2",
        public_id: "oxford-2",
      },
      {
        url: "https://loremflickr.com/320/240/mens,white,shirt?lock=3",
        public_id: "oxford-3",
      },
    ],
  },
  {
    name: "Lumberjack Flannel Shirt",
    description:
      "Heavyweight brushed cotton flannel in red and black plaid. Designed for durability and warmth during colder months.",
    price: 1899,
    category: FASHION_CATEGORY_ID,
    stock: 30,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/flannel,shirt?lock=4",
        public_id: "flannel-1",
      },
      {
        url: "https://loremflickr.com/320/240/flannel,shirt?lock=5",
        public_id: "flannel-2",
      },
      {
        url: "https://loremflickr.com/320/240/flannel,shirt?lock=6",
        public_id: "flannel-3",
      },
    ],
  },
  {
    name: "Textured Knit Polo",
    description:
      "A breathable, mid-weight knit polo with contrasting collar trims. A modern upgrade to the classic golf shirt.",
    price: 1299,
    category: FASHION_CATEGORY_ID,
    stock: 55,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/mens,polo,shirt?lock=7",
        public_id: "polo-1",
      },
      {
        url: "https://loremflickr.com/320/240/mens,polo,shirt?lock=8",
        public_id: "polo-2",
      },
      {
        url: "https://loremflickr.com/320/240/mens,polo,shirt?lock=9",
        public_id: "polo-3",
      },
    ],
  },
  {
    name: "Ribbed Henley T-Shirt",
    description:
      "Slim-fit Henley with a 3-button placket. Made from a stretch-cotton blend that accentuates the physique.",
    price: 899,
    category: FASHION_CATEGORY_ID,
    stock: 80,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/henley,shirt?lock=10",
        public_id: "henley-1",
      },
      {
        url: "https://loremflickr.com/320/240/henley,shirt?lock=11",
        public_id: "henley-2",
      },
      {
        url: "https://loremflickr.com/320/240/henley,shirt?lock=12",
        public_id: "henley-3",
      },
    ],
  },
  {
    name: "Oversized Drop-Shoulder Tee",
    description:
      "Streetwear essential. Thick 240 GSM cotton fabric with a relaxed, boxy fit and dropped shoulder seams.",
    price: 799,
    category: FASHION_CATEGORY_ID,
    stock: 100,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/streetwear,tshirt?lock=13",
        public_id: "oversized-1",
      },
      {
        url: "https://loremflickr.com/320/240/streetwear,tshirt?lock=14",
        public_id: "oversized-2",
      },
      {
        url: "https://loremflickr.com/320/240/streetwear,tshirt?lock=15",
        public_id: "oversized-3",
      },
    ],
  },

  // --- OUTERWEAR ---
  {
    name: "Vintage Wash Denim Jacket",
    description:
      "Classic trucker jacket silhouette with slight distressing. Features branded metal hardware and twin chest pockets.",
    price: 2499,
    category: FASHION_CATEGORY_ID,
    stock: 25,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/denim,jacket?lock=16",
        public_id: "denim-jacket-1",
      },
      {
        url: "https://loremflickr.com/320/240/denim,jacket?lock=17",
        public_id: "denim-jacket-2",
      },
      {
        url: "https://loremflickr.com/320/240/denim,jacket?lock=18",
        public_id: "denim-jacket-3",
      },
    ],
  },
  {
    name: "Matte Black Leather Biker Jacket",
    description:
      "Genuine full-grain leather asymmetrical moto jacket. Heavy-duty zippers and quilted shoulder detailing.",
    price: 8999,
    category: FASHION_CATEGORY_ID,
    stock: 10,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/leather,jacket?lock=19",
        public_id: "leather-1",
      },
      {
        url: "https://loremflickr.com/320/240/leather,jacket?lock=20",
        public_id: "leather-2",
      },
      {
        url: "https://loremflickr.com/320/240/leather,jacket?lock=21",
        public_id: "leather-3",
      },
    ],
  },
  {
    name: "Lightweight Nylon Windbreaker",
    description:
      "Water-resistant shell with an adjustable hood and elasticated cuffs. Packs down easily into its own pocket.",
    price: 1899,
    category: FASHION_CATEGORY_ID,
    stock: 40,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/windbreaker,jacket?lock=22",
        public_id: "windbreaker-1",
      },
      {
        url: "https://loremflickr.com/320/240/windbreaker,jacket?lock=23",
        public_id: "windbreaker-2",
      },
      {
        url: "https://loremflickr.com/320/240/windbreaker,jacket?lock=24",
        public_id: "windbreaker-3",
      },
    ],
  },
  {
    name: "MA-1 Bomber Jacket",
    description:
      "Military-inspired flight jacket with bright orange safety lining. Insulated for warmth with ribbed collar and hem.",
    price: 3299,
    category: FASHION_CATEGORY_ID,
    stock: 15,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/bomber,jacket?lock=25",
        public_id: "bomber-1",
      },
      {
        url: "https://loremflickr.com/320/240/bomber,jacket?lock=26",
        public_id: "bomber-2",
      },
      {
        url: "https://loremflickr.com/320/240/bomber,jacket?lock=27",
        public_id: "bomber-3",
      },
    ],
  },
  {
    name: "Wool Blend Trench Coat",
    description:
      "Double-breasted overcoat tailored for a sharp, formal silhouette. Ideal for layering over suits or knitwear.",
    price: 5499,
    category: FASHION_CATEGORY_ID,
    stock: 12,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/trench,coat?lock=28",
        public_id: "trench-1",
      },
      {
        url: "https://loremflickr.com/320/240/trench,coat?lock=29",
        public_id: "trench-2",
      },
      {
        url: "https://loremflickr.com/320/240/trench,coat?lock=30",
        public_id: "trench-3",
      },
    ],
  },

  // --- BOTTOMS ---
  {
    name: "Raw Indigo Selvedge Denim",
    description:
      "14oz Japanese selvedge denim. Stiff initially, but molds to your body over time to create unique fades.",
    price: 4999,
    category: FASHION_CATEGORY_ID,
    stock: 20,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/raw,jeans?lock=31",
        public_id: "jeans-1",
      },
      {
        url: "https://loremflickr.com/320/240/raw,jeans?lock=32",
        public_id: "jeans-2",
      },
      {
        url: "https://loremflickr.com/320/240/raw,jeans?lock=33",
        public_id: "jeans-3",
      },
    ],
  },
  {
    name: "Slim Fit Stretch Chinos",
    description:
      "Versatile khaki chinos constructed with a 2% elastane blend for mobility without losing shape.",
    price: 1599,
    category: FASHION_CATEGORY_ID,
    stock: 60,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/chinos,pants?lock=34",
        public_id: "chinos-1",
      },
      {
        url: "https://loremflickr.com/320/240/chinos,pants?lock=35",
        public_id: "chinos-2",
      },
      {
        url: "https://loremflickr.com/320/240/chinos,pants?lock=36",
        public_id: "chinos-3",
      },
    ],
  },
  {
    name: "Tactical Cargo Pants",
    description:
      "Heavy-duty ripstop cotton with 6 functional flap pockets and adjustable ankle toggles for styling.",
    price: 2199,
    category: FASHION_CATEGORY_ID,
    stock: 35,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/cargo,pants?lock=37",
        public_id: "cargo-1",
      },
      {
        url: "https://loremflickr.com/320/240/cargo,pants?lock=38",
        public_id: "cargo-2",
      },
      {
        url: "https://loremflickr.com/320/240/cargo,pants?lock=39",
        public_id: "cargo-3",
      },
    ],
  },
  {
    name: "Tailored Wool Trousers",
    description:
      "Pleated front trousers in a charcoal grey. Features a hidden elastic waistband for modern comfort.",
    price: 2899,
    category: FASHION_CATEGORY_ID,
    stock: 25,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/suit,trousers?lock=40",
        public_id: "trousers-1",
      },
      {
        url: "https://loremflickr.com/320/240/suit,trousers?lock=41",
        public_id: "trousers-2",
      },
      {
        url: "https://loremflickr.com/320/240/suit,trousers?lock=42",
        public_id: "trousers-3",
      },
    ],
  },
  {
    name: "Everyday Tech Joggers",
    description:
      "Moisture-wicking, 4-way stretch fabric. Features zipped pockets and a tapered athletic fit.",
    price: 1799,
    category: FASHION_CATEGORY_ID,
    stock: 70,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/sweatpants,joggers?lock=43",
        public_id: "joggers-1",
      },
      {
        url: "https://loremflickr.com/320/240/sweatpants,joggers?lock=44",
        public_id: "joggers-2",
      },
      {
        url: "https://loremflickr.com/320/240/sweatpants,joggers?lock=45",
        public_id: "joggers-3",
      },
    ],
  },

  // --- GYM & ACTIVEWEAR ---
  {
    name: "PPL Stringer Vest",
    description:
      "Deep-cut racerback stringer designed for maximum range of motion during heavy push and pull days. Highlights back musculature.",
    price: 699,
    category: FASHION_CATEGORY_ID,
    stock: 90,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/bodybuilding,stringer?lock=46",
        public_id: "stringer-1",
      },
      {
        url: "https://loremflickr.com/320/240/bodybuilding,stringer?lock=47",
        public_id: "stringer-2",
      },
      {
        url: "https://loremflickr.com/320/240/bodybuilding,stringer?lock=48",
        public_id: "stringer-3",
      },
    ],
  },
  {
    name: "Pump Cover Oversized Hoodie",
    description:
      "Heavy fleece pump cover. Drop shoulder design to wear during warm-ups before hitting heavy compounds.",
    price: 1999,
    category: FASHION_CATEGORY_ID,
    stock: 45,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/gym,hoodie?lock=49",
        public_id: "hoodie-1",
      },
      {
        url: "https://loremflickr.com/320/240/gym,hoodie?lock=50",
        public_id: "hoodie-2",
      },
      {
        url: "https://loremflickr.com/320/240/gym,hoodie?lock=51",
        public_id: "hoodie-3",
      },
    ],
  },
  {
    name: "5-Inch Inseam Leg Day Shorts",
    description:
      "Squat-proof, lightweight 5-inch shorts. Designed not to catch on the knee during deep squats or leg presses.",
    price: 999,
    category: FASHION_CATEGORY_ID,
    stock: 60,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/gym,shorts?lock=52",
        public_id: "gym-shorts-1",
      },
      {
        url: "https://loremflickr.com/320/240/gym,shorts?lock=53",
        public_id: "gym-shorts-2",
      },
      {
        url: "https://loremflickr.com/320/240/gym,shorts?lock=54",
        public_id: "gym-shorts-3",
      },
    ],
  },
  {
    name: "Seamless Compression Tee",
    description:
      "Second-skin compression shirt. Enhances blood flow and provides a locked-in feel for high-intensity training.",
    price: 1199,
    category: FASHION_CATEGORY_ID,
    stock: 50,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/compression,shirt?lock=55",
        public_id: "compression-1",
      },
      {
        url: "https://loremflickr.com/320/240/compression,shirt?lock=56",
        public_id: "compression-2",
      },
      {
        url: "https://loremflickr.com/320/240/compression,shirt?lock=57",
        public_id: "compression-3",
      },
    ],
  },
  {
    name: "Performance Track Jacket",
    description:
      "Slim-fit zip-up track jacket. Breathable fabric ideal for outdoor cardio or casual athletic wear.",
    price: 2199,
    category: FASHION_CATEGORY_ID,
    stock: 30,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/track,jacket?lock=58",
        public_id: "track-1",
      },
      {
        url: "https://loremflickr.com/320/240/track,jacket?lock=59",
        public_id: "track-2",
      },
      {
        url: "https://loremflickr.com/320/240/track,jacket?lock=60",
        public_id: "track-3",
      },
    ],
  },

  // --- FOOTWEAR ---
  {
    name: "Minimalist White Sneakers",
    description:
      "Premium full-grain leather upper with a low-profile rubber sole. The ultimate versatile shoe for any outfit.",
    price: 2999,
    category: FASHION_CATEGORY_ID,
    stock: 40,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/white,sneakers?lock=61",
        public_id: "sneakers-1",
      },
      {
        url: "https://loremflickr.com/320/240/white,sneakers?lock=62",
        public_id: "sneakers-2",
      },
      {
        url: "https://loremflickr.com/320/240/white,sneakers?lock=63",
        public_id: "sneakers-3",
      },
    ],
  },
  {
    name: "Suede Chelsea Boots",
    description:
      "Tan suede boots with elastic side panels and a stacked heel. Pairs perfectly with denim.",
    price: 3499,
    category: FASHION_CATEGORY_ID,
    stock: 20,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/chelsea,boots?lock=64",
        public_id: "boots-1",
      },
      {
        url: "https://loremflickr.com/320/240/chelsea,boots?lock=65",
        public_id: "boots-2",
      },
      {
        url: "https://loremflickr.com/320/240/chelsea,boots?lock=66",
        public_id: "boots-3",
      },
    ],
  },
  {
    name: "Flat-Sole Lifting Shoes",
    description:
      "Zero-drop canvas shoes providing maximum ground contact and stability for deadlifts and heavy squats.",
    price: 1899,
    category: FASHION_CATEGORY_ID,
    stock: 35,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/canvas,shoes?lock=67",
        public_id: "lifting-shoes-1",
      },
      {
        url: "https://loremflickr.com/320/240/canvas,shoes?lock=68",
        public_id: "lifting-shoes-2",
      },
      {
        url: "https://loremflickr.com/320/240/canvas,shoes?lock=69",
        public_id: "lifting-shoes-3",
      },
    ],
  },
  {
    name: "Chunky Sole Runners",
    description:
      "Retro-inspired running shoes with an exaggerated EVA foam midsole for all-day street comfort.",
    price: 4299,
    category: FASHION_CATEGORY_ID,
    stock: 25,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/running,shoes?lock=70",
        public_id: "runners-1",
      },
      {
        url: "https://loremflickr.com/320/240/running,shoes?lock=71",
        public_id: "runners-2",
      },
      {
        url: "https://loremflickr.com/320/240/running,shoes?lock=72",
        public_id: "runners-3",
      },
    ],
  },
  {
    name: "Leather Penny Loafers",
    description:
      "Slip-on formal loafers crafted from polished black leather. Features the classic saddle strap.",
    price: 3999,
    category: FASHION_CATEGORY_ID,
    stock: 15,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/leather,loafers?lock=73",
        public_id: "loafers-1",
      },
      {
        url: "https://loremflickr.com/320/240/leather,loafers?lock=74",
        public_id: "loafers-2",
      },
      {
        url: "https://loremflickr.com/320/240/leather,loafers?lock=75",
        public_id: "loafers-3",
      },
    ],
  },

  // --- ACCESSORIES & WATCHES ---
  {
    name: "Vintage Mechanical Field Watch",
    description:
      "Hand-wound mechanical movement. 38mm stainless steel case with a domed acrylic crystal and nato strap. Reliable and rugged.",
    price: 6500,
    category: FASHION_CATEGORY_ID,
    stock: 10,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/mens,watch?lock=76",
        public_id: "watch-1",
      },
      {
        url: "https://loremflickr.com/320/240/mens,watch?lock=77",
        public_id: "watch-2",
      },
      {
        url: "https://loremflickr.com/320/240/mens,watch?lock=78",
        public_id: "watch-3",
      },
    ],
  },
  {
    name: "Classic Retro Digital Chronograph",
    description:
      "Iconic stainless steel digital watch. Features stopwatch, daily alarm, and electro-luminescent backlight.",
    price: 1595,
    category: FASHION_CATEGORY_ID,
    stock: 45,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/digital,watch?lock=79",
        public_id: "digital-watch-1",
      },
      {
        url: "https://loremflickr.com/320/240/digital,watch?lock=80",
        public_id: "digital-watch-2",
      },
      {
        url: "https://loremflickr.com/320/240/digital,watch?lock=81",
        public_id: "digital-watch-3",
      },
    ],
  },
  {
    name: "Swiss Quartz Dress Watch",
    description:
      "Elegant 40mm dress watch with a sapphire crystal, sunburst dial, and a premium leather strap. A timeless classic.",
    price: 18500,
    category: FASHION_CATEGORY_ID,
    stock: 5,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/luxury,watch?lock=82",
        public_id: "dress-watch-1",
      },
      {
        url: "https://loremflickr.com/320/240/luxury,watch?lock=83",
        public_id: "dress-watch-2",
      },
      {
        url: "https://loremflickr.com/320/240/luxury,watch?lock=84",
        public_id: "dress-watch-3",
      },
    ],
  },
  {
    name: "Matte Black Aviator Sunglasses",
    description:
      "Classic teardrop shape with a matte black metal frame and polarized dark grey lenses. UV400 protection.",
    price: 2199,
    category: FASHION_CATEGORY_ID,
    stock: 30,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/aviator,sunglasses?lock=85",
        public_id: "sunglasses-1",
      },
      {
        url: "https://loremflickr.com/320/240/aviator,sunglasses?lock=86",
        public_id: "sunglasses-2",
      },
      {
        url: "https://loremflickr.com/320/240/aviator,sunglasses?lock=87",
        public_id: "sunglasses-3",
      },
    ],
  },
  {
    name: "Full Grain Reversible Leather Belt",
    description:
      "Thick, durable full-grain leather. Reversible design features black on one side and dark brown on the other.",
    price: 1299,
    category: FASHION_CATEGORY_ID,
    stock: 50,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/leather,belt?lock=88",
        public_id: "belt-1",
      },
      {
        url: "https://loremflickr.com/320/240/leather,belt?lock=89",
        public_id: "belt-2",
      },
      {
        url: "https://loremflickr.com/320/240/leather,belt?lock=90",
        public_id: "belt-3",
      },
    ],
  },
];
