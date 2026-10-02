// =========================================
// PANDAL DATA
// =========================================

export interface Pandal {
  id: string;
  name: string;
  bengaliName: string;
  region: Region;
  style: PandalStyle[];
  crowd: 'quiet' | 'moderate' | 'busy';
  lat: number;
  lng: number;
  description: string;
  theme: string;
  history: string;
  timings: string;
  crowdInfo: string;
  experience: ExperienceTag[];
  imageKey: string;
  distanceKm?: number;
  established?: string;
  committee?: string;
}

export type Region = 
  | 'north-kolkata'
  | 'central-kolkata'
  | 'south-kolkata'
  | 'salt-lake'
  | 'new-town'
  | 'howrah'
  | 'hooghly';

export type PandalStyle = 
  | 'Traditional'
  | 'Contemporary'
  | 'Artistic'
  | 'Heritage'
  | 'Eco';

export type ExperienceTag = 
  | 'Family-friendly'
  | 'Night visit'
  | 'Photography'
  | 'Heritage'
  | 'Large scale';

export interface RegionInfo {
  id: Region;
  name: string;
  bengaliName: string;
  description: string;
  story: string;
  imageKey: string;
  pandalCount: number;
  highlight: string;
}

export interface Trail {
  id: string;
  name: string;
  bengaliName: string;
  description: string;
  emoji: string;
  pandalIds: string[];
  totalKm: number;
  estimatedHours: number;
  theme: string;
}

// =========================================
// PANDALS
// =========================================

export const pandals: Pandal[] = [
  {
    id: 'deshapriya-park',
    name: 'Deshapriya Park',
    bengaliName: 'দেশপ্রিয় পার্ক',
    region: 'south-kolkata',
    style: ['Contemporary', 'Large scale'],
    crowd: 'busy',
    lat: 22.5189,
    lng: 88.3627,
    description: 'One of the most iconic Durga Puja celebrations in South Kolkata, known for its spectacular artistic themes and massive crowds. Each year brings a fresh creative vision that draws visitors from across the city.',
    theme: 'Contemporary artistic installation exploring social themes through grand sculptural forms.',
    history: 'Established over 75 years ago, Deshapriya Park Puja has grown from a small community celebration into one of Kolkata\'s most celebrated festivals, consistently winning awards for artistic excellence.',
    timings: 'Open 24 hours during Puja. Peak crowds: 9 PM – 1 AM',
    crowdInfo: 'Very busy. Expect large queues during evening hours. Best visited before 6 PM or after 2 AM.',
    experience: ['Night visit', 'Photography', 'Large scale'],
    imageKey: 'south_kolkata',
    distanceKm: 2.4,
    established: '1948',
    committee: 'Deshapriya Park Durgapuja Committee',
  },
  {
    id: 'tridhara',
    name: 'Tridhara Sammilani',
    bengaliName: 'ত্রিধারা সম্মিলনী',
    region: 'south-kolkata',
    style: ['Artistic', 'Contemporary'],
    crowd: 'busy',
    lat: 22.5074,
    lng: 88.3624,
    description: 'Famous for its exquisitely crafted artistic themes and award-winning designs. Tridhara consistently pushes boundaries with immersive installations that blend art and devotion seamlessly.',
    theme: 'This year\'s theme reimagines the Devi through the lens of environmental consciousness.',
    history: 'Founded in the 1950s, Tridhara has earned a reputation for being one of the most artistically ambitious Pujas in South Kolkata.',
    timings: 'Open 24 hours. Pushpanjali at 8 AM on Ashtami.',
    crowdInfo: 'Heavy crowd expected. Early morning visits (5–8 AM) are serene.',
    experience: ['Photography', 'Night visit', 'Family-friendly'],
    imageKey: 'south_kolkata',
    distanceKm: 3.1,
    established: '1952',
    committee: 'Tridhara Sammilani',
  },
  {
    id: 'mudiali',
    name: 'Mudiali Club',
    bengaliName: 'মুদিয়ালি ক্লাব',
    region: 'south-kolkata',
    style: ['Traditional', 'Heritage'],
    crowd: 'busy',
    lat: 22.5140,
    lng: 88.3448,
    description: 'Known for its bonedi-bari style celebrations and traditional aesthetic. Mudiali preserves the essence of old Kolkata Puja culture while maintaining artistic excellence.',
    theme: 'Homage to the traditional clay art forms of Bengal.',
    history: 'One of the oldest clubs in South Kolkata, Mudiali has been celebrating Durga Puja for over eight decades with unwavering devotion to tradition.',
    timings: 'Open 24 hours. Dhak performances from 7 AM daily.',
    crowdInfo: 'Moderate to busy. Relatively accessible compared to neighbours.',
    experience: ['Heritage', 'Family-friendly', 'Photography'],
    imageKey: 'north_kolkata',
    distanceKm: 4.2,
    established: '1944',
    committee: 'Mudiali Club',
  },
  {
    id: 'college-square',
    name: 'College Square',
    bengaliName: 'কলেজ স্কোয়ার',
    region: 'north-kolkata',
    style: ['Traditional', 'Heritage'],
    crowd: 'busy',
    lat: 22.5784,
    lng: 88.3650,
    description: 'Held beside the historic College Square tank, this Puja blends the grandeur of North Kolkata\'s heritage lanes with spectacular pandal artistry. The reflection of lights on the tank is a signature sight.',
    theme: 'A tribute to the intellectual and cultural heritage of North Kolkata.',
    history: 'Over a century old, College Square Puja is deeply intertwined with the cultural renaissance of North Kolkata and the surrounding university district.',
    timings: 'Open 24 hours. Sunrise Anjali at 6 AM.',
    crowdInfo: 'Extremely busy. Plan visits carefully.',
    experience: ['Heritage', 'Photography', 'Night visit', 'Large scale'],
    imageKey: 'north_kolkata',
    distanceKm: 7.8,
    established: '1910',
    committee: 'College Square Sarbojonin',
  },
  {
    id: 'bagbazar',
    name: 'Bagbazar Sarbojonin',
    bengaliName: 'বাগবাজার সর্বজনীন',
    region: 'north-kolkata',
    style: ['Traditional', 'Heritage'],
    crowd: 'moderate',
    lat: 22.5960,
    lng: 88.3640,
    description: 'The grandmother of all Kolkata Pujas. Bagbazar Sarbojonin is legendary for its pristine traditional pratima (idol) and its role in shaping community Puja culture across Bengal.',
    theme: 'Pure traditional Puja with an emphasis on the classical beauty of the Devi.',
    history: 'Established in 1919, Bagbazar Sarbojonin is credited with being among the very first community Pujas in Kolkata. A cultural institution.',
    timings: 'Open 24 hours. Peaceful early mornings recommended.',
    crowdInfo: 'Busy on main days but manageable. Peaceful during morning hours.',
    experience: ['Heritage', 'Family-friendly', 'Photography'],
    imageKey: 'north_kolkata',
    distanceKm: 9.2,
    established: '1919',
    committee: 'Bagbazar Sarbojonin',
  },
  {
    id: 'chetla-agrani',
    name: 'Chetla Agrani',
    bengaliName: 'চেতলা অগ্রণী',
    region: 'south-kolkata',
    style: ['Artistic', 'Contemporary'],
    crowd: 'busy',
    lat: 22.5260,
    lng: 88.3380,
    description: 'Consistently one of Kolkata\'s most awarded Pujas for artistic brilliance. Chetla Agrani transforms its space into a breathtaking work of art each year.',
    theme: 'An immersive journey through Bengal\'s mythological landscape.',
    history: 'Founded in the 1950s, Chetla Agrani has grown to become synonymous with artistic Puja in South Kolkata.',
    timings: 'Open 24 hours. Best experienced after dark.',
    crowdInfo: 'Very busy during evening hours. Dawn visits are magical.',
    experience: ['Photography', 'Night visit', 'Family-friendly'],
    imageKey: 'south_kolkata',
    distanceKm: 5.6,
    established: '1956',
    committee: 'Chetla Agrani Club',
  },
  {
    id: 'suruchi-sangha',
    name: 'Suruchi Sangha',
    bengaliName: 'সুরুচি সংঘ',
    region: 'south-kolkata',
    style: ['Contemporary', 'Eco'],
    crowd: 'moderate',
    lat: 22.5215,
    lng: 88.3505,
    description: 'Known for thoughtful, socially relevant themes and eco-friendly celebrations. Suruchi Sangha connects Puja traditions to contemporary social consciousness.',
    theme: 'The theme this year celebrates the resilience of Bengal\'s rural women artisans.',
    history: 'A relatively younger Puja that has quickly earned acclaim for its meaningful and visually stunning presentations.',
    timings: 'Open 24 hours. Cultural performances at 8 PM daily.',
    crowdInfo: 'Moderate crowds. Comfortable visiting experience.',
    experience: ['Photography', 'Family-friendly', 'Night visit'],
    imageKey: 'salt_lake',
    distanceKm: 3.8,
    established: '1970',
    committee: 'Suruchi Sangha',
  },
  {
    id: 'salt-lake-fd',
    name: 'FD Block Puja',
    bengaliName: 'এফডি ব্লক পুজো',
    region: 'salt-lake',
    style: ['Traditional', 'Heritage'],
    crowd: 'quiet',
    lat: 22.5744,
    lng: 88.4133,
    description: 'A serene community celebration in the planned township of Salt Lake. The FD Block Puja is beloved for its intimate, family-friendly atmosphere and warmly decorated spaces.',
    theme: 'Traditional Bengal village Puja theme with natural materials and folk art.',
    history: 'Part of Salt Lake\'s long-standing community Puja tradition, this celebration has been a neighbourhood anchor for over 40 years.',
    timings: 'Open 10 AM – 2 AM. Cultural programs at 7 PM.',
    crowdInfo: 'Quiet and comfortable. Perfect for families with children.',
    experience: ['Family-friendly', 'Heritage'],
    imageKey: 'salt_lake',
    distanceKm: 12.4,
    established: '1982',
    committee: 'FD Block Durga Puja Committee',
  },
  {
    id: 'new-town-eco',
    name: 'New Town Eco Park Puja',
    bengaliName: 'নিউটাউন ইকো পার্ক পুজো',
    region: 'new-town',
    style: ['Contemporary', 'Eco', 'Artistic'],
    crowd: 'moderate',
    lat: 22.5970,
    lng: 88.4740,
    description: 'A spectacular modern installation-style Puja set against the backdrop of Eco Park. Known for cutting-edge themes that blend technology, nature, and devotion.',
    theme: 'The future of devotion — a digital-age Puja experience with interactive art installations.',
    history: 'New Town Eco Park Puja represents the newest wave of Kolkata\'s Puja culture, embracing contemporary art while honouring the festival\'s spiritual core.',
    timings: 'Open 11 AM – 11 PM. Light show at 9 PM.',
    crowdInfo: 'Moderate. Managed queues with good crowd control.',
    experience: ['Photography', 'Night visit', 'Family-friendly'],
    imageKey: 'new_town',
    distanceKm: 15.2,
    established: '2012',
    committee: 'Hidco New Town Puja',
  },
];

// =========================================
// REGIONS
// =========================================

export const regions: RegionInfo[] = [
  {
    id: 'north-kolkata',
    name: 'North Kolkata',
    bengaliName: 'উত্তর কলকাতা',
    description: 'Heritage & Tradition',
    story: 'Narrow lanes, old neighbourhoods, bonedi bari traditions and centuries of cultural history. North Kolkata is where Puja was born.',
    imageKey: 'north_kolkata',
    pandalCount: 42,
    highlight: 'The soul of Kolkata\'s Puja tradition',
  },
  {
    id: 'central-kolkata',
    name: 'Central Kolkata',
    bengaliName: 'মধ্য কলকাতা',
    description: 'Historic Grandeur',
    story: 'Where history meets festivity. The heart of the city pulses with dhak beats, tram bells, and the golden glow of a thousand diyas.',
    imageKey: 'central_kolkata',
    pandalCount: 38,
    highlight: 'Colonial grandeur meets Bengali culture',
  },
  {
    id: 'south-kolkata',
    name: 'South Kolkata',
    bengaliName: 'দক্ষিণ কলকাতা',
    description: 'Artistic Scale',
    story: 'The home of Kolkata\'s most celebrated artistic Pujas. South Kolkata pushes the boundaries of what pandal art can be.',
    imageKey: 'south_kolkata',
    pandalCount: 56,
    highlight: 'Award-winning artistic spectacles',
  },
  {
    id: 'salt-lake',
    name: 'Salt Lake',
    bengaliName: 'সল্ট লেক',
    description: 'Community Warmth',
    story: 'The planned township comes alive with intimate block-level celebrations that capture the essence of neighbourhood togetherness.',
    imageKey: 'salt_lake',
    pandalCount: 28,
    highlight: 'Family celebrations and community spirit',
  },
  {
    id: 'new-town',
    name: 'New Town',
    bengaliName: 'নিউটাউন',
    description: 'Modern Vision',
    story: 'Kolkata\'s newest neighbourhood embraces contemporary art installations and futuristic themes, redefining what Puja can look like.',
    imageKey: 'new_town',
    pandalCount: 18,
    highlight: 'Futuristic installations and modern art',
  },
];

// =========================================
// TRAILS
// =========================================

export const trails: Trail[] = [
  {
    id: 'south-night-trail',
    name: 'South Kolkata Night Trail',
    bengaliName: 'দক্ষিণ কলকাতা রাত্রির পথ',
    description: 'The ultimate night journey through South Kolkata\'s most spectacular pandals. Best experienced after 10 PM when the lights are at their most magical.',
    emoji: '🌙',
    pandalIds: ['deshapriya-park', 'tridhara', 'mudiali', 'suruchi-sangha', 'chetla-agrani'],
    totalKm: 8.6,
    estimatedHours: 3,
    theme: 'Night',
  },
  {
    id: 'heritage-trail',
    name: 'Heritage & Bonedi Trail',
    bengaliName: 'ঐতিহ্যের পথ',
    description: 'Walk through the living heritage of Kolkata\'s oldest Pujas. A journey through time, tradition, and the bonedi bari culture of North Kolkata.',
    emoji: '🏛️',
    pandalIds: ['bagbazar', 'college-square', 'mudiali'],
    totalKm: 5.2,
    estimatedHours: 2.5,
    theme: 'Heritage',
  },
  {
    id: 'art-lovers-trail',
    name: 'Art Lover\'s Circuit',
    bengaliName: 'শিল্পের পথ',
    description: 'A curated journey through Kolkata\'s most artistically ambitious Pujas. For those who see pandals as living galleries.',
    emoji: '🎨',
    pandalIds: ['deshapriya-park', 'tridhara', 'chetla-agrani', 'new-town-eco'],
    totalKm: 12.4,
    estimatedHours: 4,
    theme: 'Art',
  },
  {
    id: 'family-trail',
    name: 'Family Weekend Trail',
    bengaliName: 'পারিবারিক পুজো পথ',
    description: 'A comfortable, unhurried Puja experience designed for families with children. Accessible pandals with manageable crowds and beautiful themes.',
    emoji: '👨‍👩‍👧‍👦',
    pandalIds: ['salt-lake-fd', 'new-town-eco', 'suruchi-sangha'],
    totalKm: 6.8,
    estimatedHours: 3.5,
    theme: 'Family',
  },
];

// =========================================
// IMAGE MAP
// =========================================

export const imageMap: Record<string, string> = {
  'north_kolkata': '/images/north_kolkata_region_1790874719686.jpg',
  'south_kolkata': '/images/south_kolkata_region_1790874745029.jpg',
  'central_kolkata': '/images/central_kolkata_region_1790874757692.jpg',
  'salt_lake': '/images/salt_lake_region_1790874769865.jpg',
  'new_town': '/images/new_town_region_1790874850216.jpg',
  'hero': '/images/puja_hero_bg_1790874706385.jpg',
  'logo': '/images/pujorpothe_logo_1790874648371.jpg',
  'shiuli': '/images/shiuli_flowers_1790874869796.jpg',
};

// Helper
export function getRegionInfo(regionId: Region): RegionInfo | undefined {
  return regions.find(r => r.id === regionId);
}

export function getPandalsByRegion(regionId: Region): Pandal[] {
  return pandals.filter(p => p.region === regionId);
}

export function getPandalById(id: string): Pandal | undefined {
  return pandals.find(p => p.id === id);
}

export function getTrailPandals(trail: Trail): Pandal[] {
  return trail.pandalIds.map(id => pandals.find(p => p.id === id)!).filter(Boolean);
}
