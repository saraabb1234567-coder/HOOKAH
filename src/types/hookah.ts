export interface HookahComponent {
  id: string;
  stepNumber: number;
  name: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  material: string;
  specs: string;
  yOffset: number; // For exploded view vertical spacing
  xOffset: number;
}

export const HOOKAH_COMPONENTS: HookahComponent[] = [
  {
    id: 'body',
    stepNumber: 1,
    name: 'Acrylic W-Shaped Body',
    shortLabel: 'BODY',
    subtitle: 'Dual-Chamber Geometric Monolith',
    description: 'Sculpted from high-purity optical-grade PMMA acrylic in a distinctive W-profile. Dual acoustic chambers with reinforced internal seals and integrated LED light-diffusion base.',
    material: 'Optical-Grade PMMA Acrylic (12mm wall)',
    specs: '750ml fluid capacity · Impact resistant · Weight 1,420g',
    yOffset: 240,
    xOffset: 0,
  },
  {
    id: 'connectors',
    stepNumber: 2,
    name: 'Precision Metal Connectors',
    shortLabel: 'CONNECTORS',
    subtitle: 'CNC Milled Stainless Ports & Purge',
    description: 'Triple top port collars with airtight silicone O-ring seating. Includes slotted vertical purge valve on the left and quick-disconnect hose port on the right.',
    material: '304 Medical Stainless Steel',
    specs: 'Dual O-Ring Viton Seals · Mirror finish · 100% airtight',
    yOffset: 160,
    xOffset: -80,
  },
  {
    id: 'stem',
    stepNumber: 3,
    name: 'Internal Downstem Tube',
    shortLabel: 'STEM',
    subtitle: 'Main Central Flow Tube',
    description: 'Submerged stainless steel downstem with threaded connector collar and dual purge vents. Calibrated for instant laminar airflow with zero draw resistance.',
    material: 'Austenitic 304 Stainless Steel',
    specs: '14mm inner diameter · Anti-corrosive passivated core',
    yOffset: 80,
    xOffset: 0,
  },
  {
    id: 'diffuser',
    stepNumber: 4,
    name: 'Twin Spring Diffusers (2 Pieces)',
    shortLabel: 'DIFFUSER',
    subtitle: 'Acoustic Sound Dampening Coils',
    description: 'Dual stainless steel cylinder cores wrapped in cyan tension spring coils. Engineered to shred large air pockets into micro-bubbles for an ultra-silent, whisper-smooth pull.',
    material: 'Stainless Steel & Cyan Spring Coils',
    specs: '-85% acoustic bubble dampening · Dual balanced intake',
    yOffset: 120,
    xOffset: 70,
  },
  {
    id: 'water',
    stepNumber: 5,
    name: 'Translucent Water Chamber',
    shortLabel: 'WATER',
    subtitle: 'Fluid Filtration & Cooling Matrix',
    description: 'Dual-wall water reservoir illuminated from below by multi-spectrum LED. Chills the draw instantly while capturing fine particles in silky micro-effervescence.',
    material: 'Dual-Reservoir PMMA Base',
    specs: 'Recommended fill: 450-500ml cold distilled or iced water',
    yOffset: 200,
    xOffset: 0,
  },
  {
    id: 'plate',
    stepNumber: 6,
    name: 'Smoked Glass Plate',
    shortLabel: 'PLATE',
    subtitle: 'Charcoal Ash Tray with Silver Rim',
    description: 'Circular tempered smoke-grey glass plate with beveled chrome metallic perimeter edge. Thermal shock resistant up to 600°C for secure charcoal management.',
    material: 'Tempered Borosilicate Glass & Chrome Bezel',
    specs: '210mm diameter · 5mm heat-tempered glass · Mirror bevel',
    yOffset: -40,
    xOffset: 0,
  },
  {
    id: 'bowl',
    stepNumber: 7,
    name: 'Faceted Crystal Bowl',
    shortLabel: 'BOWL',
    subtitle: 'Diamond-Cut Flavor Vessel',
    description: 'Heavy cut-crystal phunnel bowl with faceted diamond exterior geometry. Ensures uniform heat retention across premium shisha leaf blends with zero flavor bleed.',
    material: 'Heavy-Cut Faceted Crystal Glass',
    specs: '20-25g flavor capacity · Thermal uniform core · Non-porous',
    yOffset: -140,
    xOffset: 0,
  },
  {
    id: 'hose',
    stepNumber: 8,
    name: 'Frosted Silicone Hose',
    shortLabel: 'HOSE',
    subtitle: 'Food-Grade Flexible Hose',
    description: 'Translucent frosted matte white silicone tubing with anti-kink memory. Fully washable, non-ghosting silicone with 90-degree CNC aluminum elbow connector.',
    material: 'Medical-Grade Frosted Silicone',
    specs: '1.5m extended length · Anti-static dust-repellent finish',
    yOffset: 140,
    xOffset: 190,
  },
  {
    id: 'mouthpiece',
    stepNumber: 9,
    name: 'Machined Metal Mouthpiece',
    shortLabel: 'MOUTHPIECE',
    subtitle: 'Ergonomic Ribbed Wand',
    description: 'Precision CNC-turned stainless steel wand with decorative knurled grip rings, ergonomic finger contour, and tapered comfort mouthpiece tip.',
    material: 'Machined 304 Stainless Steel',
    specs: '300mm length · 185g counter-balanced center of gravity',
    yOffset: 250,
    xOffset: 160,
  },
];

export interface HowItWorksStep {
  number: string;
  title: string;
  summary: string;
  detail: string;
  tip: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'FILL',
    summary: 'Fill the base with water.',
    detail: 'Add approximately 450ml of cold, filtered water into the W-shaped acrylic chamber until the twin spring diffuser tips are submerged 15-20mm below the surface. Add clean ice for extra cool density.',
    tip: 'Keep water line 2cm below the top ports to allow maximum expansion volume.',
  },
  {
    number: '02',
    title: 'ASSEMBLE',
    summary: 'Connect the stem and components.',
    detail: 'Thread the stainless downstem into the center collar. Slot the twin spring diffusers into their ports. Ensure all O-rings are firmly seated for complete airtight suction.',
    tip: 'Finger-tighten only; the Viton silicone seals lock hermetically without force.',
  },
  {
    number: '03',
    title: 'PREPARE',
    summary: 'Place the flavor into the bowl.',
    detail: 'Fluff your favorite shisha leaf blend and distribute evenly into the faceted crystal bowl around the central phunnel spire, leaving a 2mm clearance below the rim.',
    tip: 'Do not overpack; gentle aeration allows uniform hot airflow around every leaf.',
  },
  {
    number: '04',
    title: 'HEAT',
    summary: 'Prepare the bowl and heat source.',
    detail: 'Position the circular smoked glass ash plate on the stem collar. Mount your heat management device or foil atop the crystal bowl and apply 2-3 glowing natural coconut coals.',
    tip: 'Allow 3-5 minutes for the faceted crystal walls to soak up uniform ambient heat.',
  },
  {
    number: '05',
    title: 'CONNECT',
    summary: 'Attach the hose.',
    detail: 'Insert the 90° stainless elbow connector into the right port and seat the frosted silicone hose securely. Attach the ergonomic knurled metal mouthpiece to the working end.',
    tip: 'Test draw resistance with a quick pull before heating to ensure silent airflow.',
  },
  {
    number: '06',
    title: 'ENJOY',
    summary: 'Activate the lighting and enjoy the experience.',
    detail: 'Turn on the integrated underglow LED puck via the remote control. Select your favorite ambient color hue (electric cyan, ice blue, or violet) and take smooth, effortless draws.',
    tip: 'Purge gently through the left port valve to clear old smoke whenever desired.',
  },
];

export interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  highlight: string;
  description: string;
  statNumber: string;
  statLabel: string;
  image?: string;
}

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'crystal-bowl',
    title: 'CRYSTAL BOWL',
    tagline: 'Precision Thermal Purity',
    highlight: 'Diamond-cut heavy crystal glass',
    description: 'Engineered from high-refraction cut crystal glass with multifaceted exterior geometry. Preserves delicate flavor profiles without staining, ghosting, or metallic aftertastes.',
    statNumber: '100%',
    statLabel: 'Pure Flavor Fidelity',
    image: '/src/assets/images/hookah_crystal_bowl_1791448601777.jpg',
  },
  {
    id: 'acrylic-body',
    title: 'PREMIUM ACRYLIC BODY',
    tagline: 'Sculpted W-Shaped Architecture',
    highlight: 'Optical-grade 12mm cast PMMA',
    description: 'Shatterproof cast acrylic carved into a bold architectural "W". The twin-chamber geometry increases water surface contact while showcasing brilliant internal fluid mechanics.',
    statNumber: '12mm',
    statLabel: 'Monolithic Wall Thickness',
    image: '/src/assets/images/hookah_hero_cyan_1791448575618.jpg',
  },
  {
    id: 'led-lighting',
    title: 'LED LIGHTING',
    tagline: 'Multi-Spectrum Bioluminescence',
    highlight: 'Wireless underglow base system',
    description: 'A discreet high-output LED puck nestled beneath the acrylic W-base radiates light through the water matrix and translucent blue walls, transforming every session into a visual centerpiece.',
    statNumber: '16M',
    statLabel: 'Color Spectrum Variations',
  },
  {
    id: 'spring-diffuser',
    title: 'SPRING DIFFUSER',
    tagline: 'Twin Coil Sound Dampening',
    highlight: 'Dual cyan-wound tension springs',
    description: 'Unlike ordinary single diffusers, our twin spring coils break ascending air pockets into millions of micro-bubbles, dampening sound vibration by up to 85% for silent draws.',
    statNumber: '-85%',
    statLabel: 'Vibration & Bubble Noise',
  },
  {
    id: 'smooth-airflow',
    title: 'SMOOTH AIRFLOW',
    tagline: 'Zero-Resistance Fluid Dynamics',
    highlight: '14mm wide-bore surgical steel',
    description: 'A streamlined internal chamber and precision-engineered downstem eliminate turbulent choke points. Pull effortless, dense, velvety clouds with minimal lung effort.',
    statNumber: '0.04s',
    statLabel: 'Instant Draw Response',
  },
];

export interface ColorTheme {
  id: string;
  name: string;
  glowColor: string;
  baseColor: string;
  accentHex: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'cyan',
    name: 'Electric Cyan',
    glowColor: 'rgba(0, 242, 254, 0.6)',
    baseColor: '#00F2FE',
    accentHex: '#00F2FE',
  },
  {
    id: 'ice-blue',
    name: 'Arctic Ice',
    glowColor: 'rgba(56, 189, 248, 0.6)',
    baseColor: '#38BDF8',
    accentHex: '#38BDF8',
  },
  {
    id: 'emerald',
    name: 'Emerald Abyss',
    glowColor: 'rgba(52, 211, 153, 0.6)',
    baseColor: '#34D399',
    accentHex: '#34D399',
  },
  {
    id: 'violet',
    name: 'Ultraviolet',
    glowColor: 'rgba(192, 132, 252, 0.6)',
    baseColor: '#C084FC',
    accentHex: '#C084FC',
  },
  {
    id: 'amber',
    name: 'Sunset Ember',
    glowColor: 'rgba(251, 146, 60, 0.6)',
    baseColor: '#FB923C',
    accentHex: '#FB923C',
  },
];
