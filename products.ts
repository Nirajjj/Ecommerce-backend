import mongoose from "mongoose";

// Replace these with actual IDs from your MongoDB collections!
const CATEGORY_ID = new mongoose.Types.ObjectId("69d8eecc133da3fc5fbb5266");
const SELLER_USER_ID = new mongoose.Types.ObjectId("69d7cb102f8f394b9149d410");

export const products = [
  // Adding 40 Books Category Products
  // Adding 40 Automotive Category Products
  {
    name: "Portable Tire Inflator",
    description:
      "Compact digital air compressor with auto shut-off and LED light for cars and bikes.",
    price: 3499,
    category: CATEGORY_ID,
    stock: 50,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/car,pump?lock=1001",
        public_id: "auto-1-1",
      },
      {
        url: "https://loremflickr.com/320/240/tire,inflator?lock=1002",
        public_id: "auto-1-2",
      },
      {
        url: "https://loremflickr.com/320/240/garage,tool?lock=1003",
        public_id: "auto-1-3",
      },
    ],
  },
  {
    name: "Dual Dash Cam 4K",
    description:
      "Front and rear dashboard camera with night vision, GPS, and G-sensor for accident recording.",
    price: 8999,
    category: CATEGORY_ID,
    stock: 30,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/dashcam,car?lock=1004",
        public_id: "auto-2-1",
      },
      {
        url: "https://loremflickr.com/320/240/camera,recorder?lock=1005",
        public_id: "auto-2-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,interior?lock=1006",
        public_id: "auto-2-3",
      },
    ],
  },
  {
    name: "OBD2 Scanner Diagnostic Tool",
    description:
      "Universal car engine fault code reader compatible with all OBDII protocol vehicles.",
    price: 2499,
    category: CATEGORY_ID,
    stock: 45,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/obd2,scanner?lock=1007",
        public_id: "auto-3-1",
      },
      {
        url: "https://loremflickr.com/320/240/mechanic,tool?lock=1008",
        public_id: "auto-3-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,engine?lock=1009",
        public_id: "auto-3-3",
      },
    ],
  },
  {
    name: "Microfiber Wash Mitt & Cloths",
    description:
      "Ultra-soft, scratch-free cleaning kit for professional exterior car detailing.",
    price: 899,
    category: CATEGORY_ID,
    stock: 120,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/carwash,cloth?lock=1010",
        public_id: "auto-4-1",
      },
      {
        url: "https://loremflickr.com/320/240/detailing,microfiber?lock=1011",
        public_id: "auto-4-2",
      },
      {
        url: "https://loremflickr.com/320/240/clean,car?lock=1012",
        public_id: "auto-4-3",
      },
    ],
  },
  {
    name: "Car Vacuum Cleaner High Power",
    description:
      "Handheld 12V wet/dry vacuum with HEPA filter and multiple nozzle attachments.",
    price: 1999,
    category: CATEGORY_ID,
    stock: 65,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/vacuum,car?lock=1013",
        public_id: "auto-5-1",
      },
      {
        url: "https://loremflickr.com/320/240/cleaner,portable?lock=1014",
        public_id: "auto-5-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,seat?lock=1015",
        public_id: "auto-5-3",
      },
    ],
  },
  {
    name: "Synthetic 5W-30 Engine Oil",
    description:
      "Premium full synthetic oil (4L) for maximum engine protection and fuel efficiency.",
    price: 3200,
    category: CATEGORY_ID,
    stock: 40,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/engineoil?lock=1016",
        public_id: "auto-6-1",
      },
      {
        url: "https://loremflickr.com/320/240/oil,can?lock=1017",
        public_id: "auto-6-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,maintenance?lock=1018",
        public_id: "auto-6-3",
      },
    ],
  },
  {
    name: "Jump Starter Power Bank",
    description:
      "2000A peak current jump starter capable of starting 8L gas or 6L diesel engines.",
    price: 6499,
    category: CATEGORY_ID,
    stock: 25,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/jumpstarter,battery?lock=1019",
        public_id: "auto-7-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,battery?lock=1020",
        public_id: "auto-7-2",
      },
      {
        url: "https://loremflickr.com/320/240/emergency,power?lock=1021",
        public_id: "auto-7-3",
      },
    ],
  },
  {
    name: "Leather Seat Covers Universal",
    description:
      "Breathable faux leather covers for full interior protection and premium look.",
    price: 7500,
    category: CATEGORY_ID,
    stock: 20,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/seatcover,leather?lock=1022",
        public_id: "auto-8-1",
      },
      {
        url: "https://loremflickr.com/320/240/interior,car?lock=1023",
        public_id: "auto-8-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,seats?lock=1024",
        public_id: "auto-8-3",
      },
    ],
  },
  {
    name: "Ceramic Coating Kit",
    description:
      "9H hardness liquid glass coating for 2-year paint protection and high gloss shine.",
    price: 4500,
    category: CATEGORY_ID,
    stock: 15,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/ceramic,coating?lock=1025",
        public_id: "auto-9-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,polish?lock=1026",
        public_id: "auto-9-2",
      },
      {
        url: "https://loremflickr.com/320/240/shiny,car?lock=1027",
        public_id: "auto-9-3",
      },
    ],
  },
  {
    name: "Magnetic Phone Car Mount",
    description:
      "Strong N52 magnet mount with 360-degree rotation for air vent or dashboard.",
    price: 699,
    category: CATEGORY_ID,
    stock: 150,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/phone,mount?lock=1028",
        public_id: "auto-10-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,gadget?lock=1029",
        public_id: "auto-10-2",
      },
      {
        url: "https://loremflickr.com/320/240/mobile,holder?lock=1030",
        public_id: "auto-10-3",
      },
    ],
  },
  {
    name: "Rain-X Glass Treatment",
    description:
      "Water repellent coating that dramatically improves wet weather driving visibility.",
    price: 550,
    category: CATEGORY_ID,
    stock: 200,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/rainx,glass?lock=1031",
        public_id: "auto-11-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,windshield?lock=1032",
        public_id: "auto-11-2",
      },
      {
        url: "https://loremflickr.com/320/240/rain,car?lock=1033",
        public_id: "auto-11-3",
      },
    ],
  },
  {
    name: "Heavy Duty Floor Mats",
    description:
      "All-weather rubber mats designed to trap mud, snow, and spills easily.",
    price: 2800,
    category: CATEGORY_ID,
    stock: 55,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/floormat,car?lock=1034",
        public_id: "auto-12-1",
      },
      {
        url: "https://loremflickr.com/320/240/rubber,mat?lock=1035",
        public_id: "auto-12-2",
      },
      {
        url: "https://loremflickr.com/320/240/interior,accessory?lock=1036",
        public_id: "auto-12-3",
      },
    ],
  },
  {
    name: "LED Headlight Bulbs H7",
    description:
      "Cool white 6000K LED conversion kit with 12000 lumens per pair for better reach.",
    price: 3999,
    category: CATEGORY_ID,
    stock: 42,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/led,bulb?lock=1037",
        public_id: "auto-13-1",
      },
      {
        url: "https://loremflickr.com/320/240/headlight,car?lock=1038",
        public_id: "auto-13-2",
      },
      {
        url: "https://loremflickr.com/320/240/night,drive?lock=1039",
        public_id: "auto-13-3",
      },
    ],
  },
  {
    name: "Car GPS Tracker",
    description:
      "Real-time anti-theft tracking device with mobile app alerts and geofencing.",
    price: 4200,
    category: CATEGORY_ID,
    stock: 18,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/gps,tracker?lock=1040",
        public_id: "auto-14-1",
      },
      {
        url: "https://loremflickr.com/320/240/anti-theft?lock=1041",
        public_id: "auto-14-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,security?lock=1042",
        public_id: "auto-14-3",
      },
    ],
  },
  {
    name: "Steering Wheel Lock",
    description:
      "Heavy-duty anti-theft club lock with high security keys for all vehicles.",
    price: 1599,
    category: CATEGORY_ID,
    stock: 35,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/steeringlock?lock=1043",
        public_id: "auto-15-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,lock?lock=1044",
        public_id: "auto-15-2",
      },
      {
        url: "https://loremflickr.com/320/240/security,tool?lock=1045",
        public_id: "auto-15-3",
      },
    ],
  },
  {
    name: "Bluetooth FM Transmitter",
    description:
      "Wireless adapter with dual USB ports for hands-free calling and music streaming.",
    price: 1250,
    category: CATEGORY_ID,
    stock: 80,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/fm,transmitter?lock=1046",
        public_id: "auto-16-1",
      },
      {
        url: "https://loremflickr.com/320/240/bluetooth,car?lock=1047",
        public_id: "auto-16-2",
      },
      {
        url: "https://loremflickr.com/320/240/music,adapter?lock=1048",
        public_id: "auto-16-3",
      },
    ],
  },
  {
    name: "Pressure Washer 1800W",
    description:
      "High-pressure cleaner for home and car washing with adjustable spray wand.",
    price: 9500,
    category: CATEGORY_ID,
    stock: 12,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/pressurewasher?lock=1049",
        public_id: "auto-17-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,wash?lock=1050",
        public_id: "auto-17-2",
      },
      {
        url: "https://loremflickr.com/320/240/cleaning,machine?lock=1051",
        public_id: "auto-17-3",
      },
    ],
  },
  {
    name: "Carbon Fiber Vinyl Wrap",
    description:
      "3D textured DIY wrap for interior and exterior car styling (1.5m x 0.3m).",
    price: 1100,
    category: CATEGORY_ID,
    stock: 90,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/carbonfiber,vinyl?lock=1052",
        public_id: "auto-18-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,wrap?lock=1053",
        public_id: "auto-18-2",
      },
      {
        url: "https://loremflickr.com/320/240/styling,accessory?lock=1054",
        public_id: "auto-18-3",
      },
    ],
  },
  {
    name: "Car Air Purifier Ionizer",
    description:
      "Advanced HEPA filter air purifier that removes smoke, odors, and allergens.",
    price: 2400,
    category: CATEGORY_ID,
    stock: 30,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/airpurifier,car?lock=1055",
        public_id: "auto-19-1",
      },
      {
        url: "https://loremflickr.com/320/240/fresh,air?lock=1056",
        public_id: "auto-19-2",
      },
      {
        url: "https://loremflickr.com/320/240/ionizer?lock=1057",
        public_id: "auto-19-3",
      },
    ],
  },
  {
    name: "Windshield Sun Shade",
    description:
      "Foldable UV reflecting cover to keep the car interior cool on sunny days.",
    price: 499,
    category: CATEGORY_ID,
    stock: 200,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/sunshade,car?lock=1058",
        public_id: "auto-20-1",
      },
      {
        url: "https://loremflickr.com/320/240/windshield,cover?lock=1059",
        public_id: "auto-20-2",
      },
      {
        url: "https://loremflickr.com/320/240/heat,protection?lock=1060",
        public_id: "auto-20-3",
      },
    ],
  },
  {
    name: "Trunk Organizer Foldable",
    description:
      "Large capacity storage box with compartments to keep the boot tidy.",
    price: 1450,
    category: CATEGORY_ID,
    stock: 75,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/trunk,organizer?lock=1061",
        public_id: "auto-21-1",
      },
      {
        url: "https://loremflickr.com/320/240/storage,car?lock=1062",
        public_id: "auto-21-2",
      },
      {
        url: "https://loremflickr.com/320/240/luggage,boot?lock=1063",
        public_id: "auto-21-3",
      },
    ],
  },
  {
    name: "Head-Up Display (HUD)",
    description:
      "Universal GPS HUD projecting speed, fuel consumption, and RPM onto the windshield.",
    price: 3200,
    category: CATEGORY_ID,
    stock: 22,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/hud,car?lock=1064",
        public_id: "auto-22-1",
      },
      {
        url: "https://loremflickr.com/320/240/speedometer?lock=1065",
        public_id: "auto-22-2",
      },
      {
        url: "https://loremflickr.com/320/240/tech,interior?lock=1066",
        public_id: "auto-22-3",
      },
    ],
  },
  {
    name: "Car Battery Charger 12V",
    description:
      "Fully automatic smart trickle charger with pulse repair for car and motorcycle batteries.",
    price: 1899,
    category: CATEGORY_ID,
    stock: 40,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/batterycharger?lock=1067",
        public_id: "auto-23-1",
      },
      {
        url: "https://loremflickr.com/320/240/trickle,charge?lock=1068",
        public_id: "auto-23-2",
      },
      {
        url: "https://loremflickr.com/320/240/battery,tool?lock=1069",
        public_id: "auto-23-3",
      },
    ],
  },
  {
    name: "Electric Car Jack Kit",
    description:
      "3-ton scissor jack with electric impact wrench and inflator for quick roadside changes.",
    price: 7800,
    category: CATEGORY_ID,
    stock: 10,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/carjack,electric?lock=1070",
        public_id: "auto-24-1",
      },
      {
        url: "https://loremflickr.com/320/240/roadside,tool?lock=1071",
        public_id: "auto-24-2",
      },
      {
        url: "https://loremflickr.com/320/240/garage,equipment?lock=1072",
        public_id: "auto-24-3",
      },
    ],
  },
  {
    name: "Leather Conditioner & Cleaner",
    description:
      "Premium pH-balanced solution to restore and protect leather seats and trim.",
    price: 1250,
    category: CATEGORY_ID,
    stock: 55,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/leather,cleaner?lock=1073",
        public_id: "auto-25-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,interior?lock=1074",
        public_id: "auto-25-2",
      },
      {
        url: "https://loremflickr.com/320/240/detailing,care?lock=1075",
        public_id: "auto-25-3",
      },
    ],
  },
  {
    name: "Backup Sensor System",
    description:
      "Set of 4 ultrasonic parking sensors with an LED distance display for easy reversing.",
    price: 2100,
    category: CATEGORY_ID,
    stock: 25,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/parkingsensor?lock=1076",
        public_id: "auto-26-1",
      },
      {
        url: "https://loremflickr.com/320/240/reverse,assist?lock=1077",
        public_id: "auto-26-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,electronics?lock=1078",
        public_id: "auto-26-3",
      },
    ],
  },
  {
    name: "Headlight Restoration Kit",
    description:
      "Complete sandpaper and sealant kit to clear cloudy and yellowed headlights.",
    price: 999,
    category: CATEGORY_ID,
    stock: 45,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/headlight,clear?lock=1079",
        public_id: "auto-27-1",
      },
      {
        url: "https://loremflickr.com/320/240/diy,car?lock=1080",
        public_id: "auto-27-2",
      },
      {
        url: "https://loremflickr.com/320/240/polishing,kit?lock=1081",
        public_id: "auto-27-3",
      },
    ],
  },
  {
    name: "Portable Power Station 300W",
    description:
      "Lithium battery backup for camping, capable of running car fridges and laptops.",
    price: 15999,
    category: CATEGORY_ID,
    stock: 8,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/powerstation?lock=1082",
        public_id: "auto-28-1",
      },
      {
        url: "https://loremflickr.com/320/240/camping,gear?lock=1083",
        public_id: "auto-28-2",
      },
      {
        url: "https://loremflickr.com/320/240/portable,power?lock=1084",
        public_id: "auto-28-3",
      },
    ],
  },
  {
    name: "Bluetooth Tire Pressure Monitor",
    description:
      "TPMS with 4 external sensors and mobile app tracking for real-time PSI alerts.",
    price: 4500,
    category: CATEGORY_ID,
    stock: 15,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/tpms,sensor?lock=1085",
        public_id: "auto-29-1",
      },
      {
        url: "https://loremflickr.com/320/240/tire,pressure?lock=1086",
        public_id: "auto-29-2",
      },
      {
        url: "https://loremflickr.com/320/240/safety,tech?lock=1087",
        public_id: "auto-29-3",
      },
    ],
  },
  {
    name: "Foam Cannon for Pressure Washer",
    description:
      "Professional snow foam lance for a thick, scratch-minimizing soap layer.",
    price: 1750,
    category: CATEGORY_ID,
    stock: 60,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/foamcannon?lock=1088",
        public_id: "auto-30-1",
      },
      {
        url: "https://loremflickr.com/320/240/snowfoam?lock=1089",
        public_id: "auto-30-2",
      },
      {
        url: "https://loremflickr.com/320/240/detailing,wash?lock=1090",
        public_id: "auto-30-3",
      },
    ],
  },
  {
    name: "Car Inverter 300W",
    description:
      "Converts 12V DC to 220V AC with dual USB ports to charge laptops on the go.",
    price: 2199,
    category: CATEGORY_ID,
    stock: 35,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/inverter,car?lock=1091",
        public_id: "auto-31-1",
      },
      {
        url: "https://loremflickr.com/320/240/power,adapter?lock=1092",
        public_id: "auto-31-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,travel?lock=1093",
        public_id: "auto-31-3",
      },
    ],
  },
  {
    name: "Exhaust Muffler Tip",
    description:
      "Universal stainless steel chrome-plated tip for a sporty look and deep sound.",
    price: 1200,
    category: CATEGORY_ID,
    stock: 40,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/exhaust,muffler?lock=1094",
        public_id: "auto-32-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,tailpipe?lock=1095",
        public_id: "auto-32-2",
      },
      {
        url: "https://loremflickr.com/320/240/performance,tuning?lock=1096",
        public_id: "auto-32-3",
      },
    ],
  },
  {
    name: "Chamois Leather Drying Towel",
    description:
      "Natural shammy cloth for streak-free drying of car paint and glass.",
    price: 850,
    category: CATEGORY_ID,
    stock: 100,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/chamois,towel?lock=1097",
        public_id: "auto-33-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,drying?lock=1098",
        public_id: "auto-33-2",
      },
      {
        url: "https://loremflickr.com/320/240/cleaning,leather?lock=1099",
        public_id: "auto-33-3",
      },
    ],
  },
  {
    name: "Roof Rack Cargo Carrier",
    description:
      "Universal aerodynamic crossbars for carrying extra luggage and sports gear.",
    price: 6500,
    category: CATEGORY_ID,
    stock: 12,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/roofrack?lock=1100",
        public_id: "auto-34-1",
      },
      {
        url: "https://loremflickr.com/320/240/luggage,carrier?lock=1101",
        public_id: "auto-34-2",
      },
      {
        url: "https://loremflickr.com/320/240/suv,accessory?lock=1102",
        public_id: "auto-34-3",
      },
    ],
  },
  {
    name: "Clay Bar Detailing Kit",
    description:
      "Synthetic clay bar with lubricant to remove embedded contaminants from paint.",
    price: 1400,
    category: CATEGORY_ID,
    stock: 30,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/claybar?lock=1103",
        public_id: "auto-35-1",
      },
      {
        url: "https://loremflickr.com/320/240/paint,smooth?lock=1104",
        public_id: "auto-35-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,polish?lock=1105",
        public_id: "auto-35-3",
      },
    ],
  },
  {
    name: "Hydraulic Floor Jack 2-Ton",
    description:
      "Low-profile steel floor jack with safety bypass system for safe lifting.",
    price: 3999,
    category: CATEGORY_ID,
    stock: 15,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/floorjack,tool?lock=1106",
        public_id: "auto-36-1",
      },
      {
        url: "https://loremflickr.com/320/240/garage,jack?lock=1107",
        public_id: "auto-36-2",
      },
      {
        url: "https://loremflickr.com/320/240/heavy,duty?lock=1108",
        public_id: "auto-36-3",
      },
    ],
  },
  {
    name: "Car Seat Gap Organizer",
    description:
      "Slips between seat and console to provide extra storage and catch falling items.",
    price: 750,
    category: CATEGORY_ID,
    stock: 120,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/seatgap,organizer?lock=1109",
        public_id: "auto-37-1",
      },
      {
        url: "https://loremflickr.com/320/240/car,tidy?lock=1110",
        public_id: "auto-37-2",
      },
      {
        url: "https://loremflickr.com/320/240/interior,storage?lock=1111",
        public_id: "auto-37-3",
      },
    ],
  },
  {
    name: "Microfiber Detailing Brushes",
    description:
      "Set of 5 brushes for cleaning vents, emblems, and hard-to-reach crevices.",
    price: 899,
    category: CATEGORY_ID,
    stock: 80,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/carbrush,detail?lock=1112",
        public_id: "auto-38-1",
      },
      {
        url: "https://loremflickr.com/320/240/cleaning,brush?lock=1113",
        public_id: "auto-38-2",
      },
      {
        url: "https://loremflickr.com/320/240/crevice,tool?lock=1114",
        public_id: "auto-38-3",
      },
    ],
  },
  {
    name: "Anti-Fog Mirror Film",
    description:
      "Pack of 2 protective films for side mirrors to maintain clarity during rain.",
    price: 350,
    category: CATEGORY_ID,
    stock: 300,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/mirror,film?lock=1115",
        public_id: "auto-39-1",
      },
      {
        url: "https://loremflickr.com/320/240/rain,shield?lock=1116",
        public_id: "auto-39-2",
      },
      {
        url: "https://loremflickr.com/320/240/car,mirror?lock=1117",
        public_id: "auto-39-3",
      },
    ],
  },
  {
    name: "Engine Degreaser Spray",
    description:
      "Professional strength formula to quickly dissolve grease and road grime.",
    price: 650,
    category: CATEGORY_ID,
    stock: 60,
    seller: SELLER_USER_ID,
    images: [
      {
        url: "https://loremflickr.com/320/240/degreaser,engine?lock=1118",
        public_id: "auto-40-1",
      },
      {
        url: "https://loremflickr.com/320/240/clean,engine?lock=1119",
        public_id: "auto-40-2",
      },
      {
        url: "https://loremflickr.com/320/240/chemical,car?lock=1120",
        public_id: "auto-40-3",
      },
    ],
  },
];
