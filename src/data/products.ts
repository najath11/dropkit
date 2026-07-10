import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'js-01',
    name: 'AÉRO / ARCHIVE FC-01',
    codename: 'Madrid Club Edition',
    price: 195,
    category: 'club',
    description: 'A technical masterpiece engineered for professional pitch performance. Milled with lightweight speed-grids, bonded gold collar linings, and heat-pressed club crests to eliminate skin friction.',
    details: [
      'Ultra-breathable AeroGrid jacquard weave',
      'Heat-applied ultra-light golden crest and star elements',
      'Laser-perforated cooling zones across the spine',
      'Seamless flatlock bonded cuffs and side seams',
      'Athletic slim fit optimized for high-acceleration movement'
    ],
    fabric: {
      composition: '100% Recycled Polyamide fibers',
      weight: '120 gsm',
      origin: 'Lombardy, Italy',
      features: ['Active Moisture Dissipation', 'Anti-cling Debossed Pattern', 'Odor-block Finish'],
      dragCoef: '0.315 CdA',
      reclaimedPercentage: '92%'
    },
    colors: [
      { name: 'Triple White & Gold', hex: '#F9F6F0' },
      { name: 'Carbon Black & Gold', hex: '#1E1E1E' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/assets/jersey_football_madrid.png'
  },
  {
    id: 'js-02',
    name: 'AÉRO / ARCHIVE INT-02',
    codename: 'Argentina World Cup Edition',
    price: 220,
    category: 'intl',
    description: 'Archival championship design re-engineered for the modern athlete. Features debossed vertical striping, custom-milled ocean-bound plastics, and a woven gold star federation insignia.',
    details: [
      'Engineered mesh vertical debossed stripe structure',
      '100% Ocean-bound post-consumer recycled polyamides',
      'Reflective gold trim detailing on cuffs and collar',
      'Three-star woven championship crest',
      'High-stretch elastic recovery fabric'
    ],
    fabric: {
      composition: '88% Recycled Polyester, 12% Bio-Elastane',
      weight: '98 gsm',
      origin: 'Treviso, Italy',
      features: ['Hyper-Evaporative Weave', 'High-tensile Seams', 'Micro-capillary Moisture Management'],
      dragCoef: '0.335 CdA',
      reclaimedPercentage: '88%'
    },
    colors: [
      { name: 'Celeste Blue & White', hex: '#87CEEB' },
      { name: 'Midnight Blue & Gold', hex: '#1D2A44' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/assets/jersey_football_argentina.png'
  },
  {
    id: 'js-03',
    name: 'AÉRO / ARCHIVE FC-03',
    codename: 'Milano Club Edition',
    price: 185,
    category: 'club',
    description: 'A bold, high-contrast kit built for intensive match conditions. Incorporates double-knit micro-fleece blends for cold-weather muscle warming during early winter matchdays.',
    details: [
      'Double-knit thermal regulation weave',
      'Matte-finished vertical red and black stripes',
      'Anti-abrasion collar striping',
      'Seamless ventilation panels under sleeves'
    ],
    fabric: {
      composition: '75% Recycled Polyester, 25% Organic Merino wool',
      weight: '140 gsm',
      origin: 'Como, Italy',
      features: ['Thermal Muscle Regulation', 'Wool-Poly Blend Comfort', 'Natural Antimicrobial Finish'],
      dragCoef: '0.340 CdA',
      reclaimedPercentage: '75%'
    },
    colors: [
      { name: 'Rossoneri Red & Black', hex: '#9E2A2B' },
      { name: 'Milano Shadow Gray', hex: '#373A40' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/jersey_football_milan.png'
  },
  {
    id: 'js-04',
    name: 'AÉRO / ARCHIVE INT-04',
    codename: 'Morocco Cup Edition',
    price: 210,
    category: 'intl',
    description: 'An aerodynamic national kit incorporating traditional Moroccan geometric motifs on the collar and cuffs, engineered for warm weather performance with active thermoregulation.',
    details: [
      'Heat-applied gold federation insignia and details',
      'Custom patterned flat-knit collar and sleeve trim',
      'Micro-perforated back panel for maximum ventilation',
      'Fitted silhouette optimized for high speed'
    ],
    fabric: {
      composition: '90% Recycled Polyester, 10% Elastane',
      weight: '105 gsm',
      origin: 'Casablanca, Morocco',
      features: ['Aero Drytech Mesh', 'Anti-odor Treatment', 'Quick-dry Fibers'],
      dragCoef: '0.320 CdA',
      reclaimedPercentage: '90%'
    },
    colors: [
      { name: 'Atlas Red & Gold', hex: '#C1272D' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/jersey_football_morocco_front.jpg',
    backImage: '/assets/jersey_football_morocco_back.jpg'
  },
  {
    id: 'js-05',
    name: 'AÉRO / ARCHIVE FC-04',
    codename: 'Barcelona Blaugrana Edition',
    price: 205,
    category: 'club',
    description: 'The iconic Blaugrana stripes reinterpreted with modern gradient weave structures. Constructed with hyper-evaporative yarns and a seamless collar for peak friction reduction.',
    details: [
      'Vertical Blaugrana engineered stripe structure',
      'Custom yellow-accented gold numbering and typography',
      'Seamless collar construction for friction reduction',
      'Gold heat-pressed club crest and sponsor logo'
    ],
    fabric: {
      composition: '95% Recycled Polyamide, 5% Bio-Elastane',
      weight: '110 gsm',
      origin: 'Catalonia, Spain',
      features: ['Moisture Dissipation', 'Zero-friction Seams', 'Underarm Mesh Zonal Cooling'],
      dragCoef: '0.310 CdA',
      reclaimedPercentage: '95%'
    },
    colors: [
      { name: 'Blaugrana Stripes', hex: '#004D98' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: '/assets/jersey_football_barca_front.jpg',
    backImage: '/assets/jersey_football_barca_back.jpg'
  },
  {
    id: 'js-06',
    name: 'AÉRO / ARCHIVE FC-05',
    codename: 'Liverpool Crimson Edition',
    price: 190,
    category: 'club',
    description: 'A striking crimson jersey featuring sharp, geometric pinstripe textures and white details. Developed with double-knit active cooling filaments for consistent performance under matchday stress.',
    details: [
      'Engineered geometric diagonal pinstripe graphic',
      'Heat-applied white club crest and sponsor logos',
      'Contrast white ribbed collar and side trim',
      'High-ventilation zone mapping across chest and back'
    ],
    fabric: {
      composition: '100% Recycled Polyester fibers',
      weight: '115 gsm',
      origin: 'Merseyside, UK',
      features: ['Micro-capillary Moisture Transport', 'High-stretch Recovery', 'Anti-cling Knit'],
      dragCoef: '0.325 CdA',
      reclaimedPercentage: '85%'
    },
    colors: [
      { name: 'Crimson Red & White', hex: '#C8102E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/assets/jersey_football_liverpool_front.jpg'
  }
];
