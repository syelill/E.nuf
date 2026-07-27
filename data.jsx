// === E.NUF sample data ===

const ARTWORK_PALETTES = [
  ['#c97a52', '#7a3c25', '#f1d8a8', '#2e2418'],         // golden hour / kampong glam
  ['#3e5a6b', '#a8c4cf', '#e9d6a8', '#1b2630'],         // floating world
  ['#7a4b2f', '#d39563', '#f0d8b4', '#2a1a10'],         // morocco
  ['#4e6a3b', '#a7b97a', '#ead7a5', '#1e2a18'],         // ghana
  ['#7b5a8a', '#c39bd1', '#efe2cf', '#2a1f33'],         // memory study
  ['#b16a3a', '#e9b07a', '#f4e3c4', '#3a2113'],         // portugal tile
  ['#2d4a4a', '#86acac', '#e8d4a8', '#152626'],         // seoul digital
  ['#925b3a', '#dba074', '#f4e1c3', '#2e180b'],         // india threads
];

// Placeholder artwork — abstract paint-like SVG using palette
function ArtPlaceholder({ palette, seed = 0, label }) {
  const [c1, c2, c3, c4] = palette;
  const s = seed * 13.7;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c3} />
          <stop offset="100%" stopColor={c1} />
        </linearGradient>
        <filter id={`grain-${seed}`}>
          <feTurbulence baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={`url(#bg-${seed})`} />
      {/* gestural shapes */}
      <ellipse cx={120 + (s % 80)} cy={140 + ((s * 1.3) % 60)} rx="120" ry="80" fill={c2} opacity="0.7" transform={`rotate(${(s % 30) - 15} 120 140)`} />
      <ellipse cx={260 + ((s * 2.1) % 60)} cy={320 + ((s * 1.7) % 80)} rx="100" ry="140" fill={c4} opacity="0.55" transform={`rotate(${(s % 40) - 20} 260 320)`} />
      <path d={`M 30 ${380 + (s % 40)} Q 200 ${280 + (s % 60)} 380 ${360 + (s % 50)}`} stroke={c4} strokeWidth="3" fill="none" opacity="0.6" />
      <path d={`M 50 ${100 + (s % 30)} Q 200 ${60 + (s % 40)} 350 ${120 + (s % 30)}`} stroke={c2} strokeWidth="2" fill="none" opacity="0.55" />
      {/* corner mark */}
      <text x="20" y="485" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill={c4} letterSpacing="2">
        {label || `STUDY · ${String(seed).padStart(3, '0')}`}
      </text>
      <rect width="400" height="500" fill={c1} filter={`url(#grain-${seed})`} opacity=".6" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
}

const ARTWORKS = [
  // ============================================================
  //  E.NUF artwork archive — real images
  //  Update title / year / medium / location / description / tags
  //  for each entry below. Image paths are relative to the project root.
  // ============================================================
  {
    id: "stadetler-national-day",
    type: "polaroid",
    title: "Stadetler Collaboration on National Day",
    year: "Year to be updated",
    medium: "Community Engagement",
    location: "National Museum",
    preview: "Description to be updated.",
    description: "Description to be updated.",
    tags: ["Community Engagement", "National Museum"],
    image: "assets/Stadetler x National Museum.jpg",
    alt: "Stadetler Collaboration on National Day artwork",
    ref: "ARCH-001",
    category: "Outdoor Murals",
    palette: 0,
    x: 1080, y: 100, w: 400, h: 380, rotation: -4
  },
  {
    id: "national-museum",
    type: "frame",
    title: "National Museum",
    year: "Year to be updated",
    medium: "Outdoor Mural",
    location: "Orchard",
    preview: "Description to be updated.",
    description: "Description to be updated.",
    tags: ["Outdoor Mural", "Orchard"],
    image: "assets/NationalMuseum.JPG",
    alt: "National Museum artwork",
    ref: "ARCH-002",
    category: "Outdoor Murals",
    palette: 3,
    x: 1800, y: 80,  w: 340, h: 325, rotation: 3
  },
  {
    id: "flash-c",
    type: "polaroid",
    title: "Flash-C",
    year: "Year to be updated",
    medium: "Outdoor Mural",
    location: "Orchard",
    preview: "A mural capturing the dynamic energy of Orchard Somerset through water, heritage, self-expression, and local identity.",
    description: `Flash-C captures the dynamic energy of Orchard Somerset, reflecting the interplay between environmental forces and human identities, showcasing the confluence of water, heritage, and self-expression. They echo the transitory yet powerful nature of "flash" phenomena—both in physical events and cultural movements; drawing inspiration from the flash floods in Orchard and "sub-culture kids". The crimson sunbird, declared as Singapore’s unofficial national bird, looks at the immersive waves - creating an open ended prompt about its own belonging and local identity.`,
    tags: ["Outdoor Mural", "Orchard"],
    image: "assets/FlashC.jpg",
    alt: "Flash-C artwork",
    ref: "ARCH-003",
    category: "Outdoor Murals",
    palette: 4,
    x: 2520, y: 100, w: 320, h: 310, rotation: -2
  },
  {
    id: "calm-corner",
    type: "polaroid",
    title: "Calm Corner",
    year: "Year to be updated",
    medium: "Outdoor Mural",
    location: "Ang Mo Kio",
    preview: "A community mural created with Chaoyang School students, transforming a public wall into a shared sanctuary of wellness and pride.",
    description: `The "Calm Corner" mural at AMK Acacia is more than a visual escape; it is a vibrant testament to inclusivity, brought to life through a heartfelt collaboration with the students of Chaoyang School. By centering the creative voices of these special needs students, the project transformed a public wall into a shared sanctuary of mental wellness and community pride. Each brushstroke serves as a powerful bridge, proving that true healing and connection happen when we make space for every hand to contribute, resulting in a landscape that is as compassionate as it is colorful.`,
    tags: ["Outdoor Mural", "Ang Mo Kio"],
    image: "assets/AMK Calm Corner.jpg",
    alt: "Calm Corner mural artwork",
    ref: "ARCH-004",
    category: "Outdoor Murals",
    palette: 3,
    x: 820,  y: 580, w: 280, h: 280, rotation: 4
  },
  {
    id: "scape-sg60-wall",
    type: "polaroid",
    title: "Title coming soon",
    year: "Year coming soon",
    medium: "Medium to be updated",
    location: "Location coming soon",
    description: "Details coming soon.",
    tags: [],
    image: "assets/SCAPE SG60 Wall.jpg",
    alt: "Archive image — *SCAPE SG60 Wall",
    ref: "ARCH-005",
    category: "Outdoor Murals",
    palette: 5,
    x: 2900, y: 520, w: 240, h: 390, rotation: 3
  },
  {
    id: "scape-10000",
    type: "polaroid",
    title: "Title coming soon",
    year: "Year coming soon",
    medium: "Medium to be updated",
    location: "Location coming soon",
    description: "Details coming soon.",
    tags: [],
    image: "assets/SCAPE10000.jpg",
    alt: "Archive image — *SCAPE 10000",
    ref: "ARCH-006",
    category: "Outdoor Murals",
    palette: 7,
    x: 920,  y: 1240, w: 220, h: 347, rotation: 5
  },
  {
    id: "necdc-201-joo-chiat-mural",
    type: "frame",
    title: "Radiance",
    year: "2025",
    medium: "",
    location: "Joo Chiat, Singapore",
    preview: "A mural featuring the phoenix and traditional lantern-making as a tribute to heritage, craftsmanship, righteousness, and community memory.",
    description: `Radiance features the phoenix and the traditional lantern as a tribute to a vanishing artisan craft — traditional lantern-making, once a key visual to festivals, faith, and community life.

The inscription on the lantern “Fèng Huáng Lái Yì” (鳳凰來義) is a deliberate transformation of the familiar auspicious phrase “Fèng Huáng Lái Yí”. While the original speaks of good fortune, Yì (義), meaning Righteousness, replaces Yí (儀). This choice responds directly to the neighbouring Lord Guan Temple, where righteousness and loyalty form the core of the deity’s spirit.

The phrase suggests that such virtue moves Heaven and Earth, drawing the mythical phoenix to appear in its honour. Through this work, the artist hopes to show that culture and tradition are not relics of the past, but living practices that can still continue today — to remember and uphold heritage and craftsmanship is, in itself, an act of righteousness.`,
    tags: ["Outdoor Mural", "Joo Chiat"],
    image: "assets/NECDC 201 Joo Chiat Mural.jpg",
    alt: "Radiance — 201 Joo Chiat Mural",
    ref: "ARCH-007",
    category: "Outdoor Murals",
    palette: 0,
    x: 1620, y: 1240, w: 460, h: 398, rotation: -1
  },
  {
    id: "necdc-shaping-hearts",
    type: "frame",
    title: "NECDC - Shaping Hearts",
    year: "Year to be updated",
    medium: "Community Engagement",
    location: "Singapore",
    preview: "Description to be updated.",
    description: "Description to be updated.",
    tags: ["Community Engagement", "Singapore Pools", "Singapore"],
    image: "assets/NECDC SGPOOL.jpg",
    alt: "NECDC - Shaping Hearts artwork",
    ref: "ARCH-008",
    category: "Outdoor Murals",
    palette: 3,
    x: 2200, y: 1280, w: 400, h: 375, rotation: 2
  },
  {
    id: "necdc-tampines",
    type: "polaroid",
    title: "Title coming soon",
    year: "Year coming soon",
    medium: "Medium to be updated",
    location: "Location coming soon",
    description: "Details coming soon.",
    tags: [],
    image: "assets/NECDC TAMPINES.jpg",
    alt: "Archive image — NECDC Tampines",
    ref: "ARCH-009",
    category: "Outdoor Murals",
    palette: 2,
    x: 2780, y: 1300, w: 320, h: 283, rotation: -3
  },
  {
    id: "gen-xyz",
    type: "polaroid",
    title: "Gen XYZ",
    year: "Year to be updated",
    medium: "Outdoor Mural",
    location: "Bras Basah",
    preview: "A mural celebrating Bras Basah Complex’s history as the City of Books and its connection to the Xinyao movement.",
    description: `Gen XYZ celebrates the rich cultural history of Bras Basah Complex, weaving its narratives through time into a vibrant mural.

Established in the 1980s as the “City of Books” (书城), the complex was a haven for literary enthusiasts, home to iconic bookstores and vibrant book fairs that united the community. Beyond its literary identity, Bras Basah Complex became the heart of the Xinyao (新谣) movement —Singapore Chinese folk songs. Although physical books and the melodies of Xinyao may fade with time, Gen XYZ seeks to preserve these cherished memories while infusing them with the vibrant energy of a younger generation. Gen XYZ bridges generational stories in a bold and visually compelling way, connecting past, present, and future. The artist hopes to inspire viewers to uncover the beauty of local heritage while nurturing fresh perspectives of this beloved space.`,
    tags: ["Outdoor Mural", "Bras Basah"],
    image: "assets/genxyz.JPEG",
    alt: "Gen XYZ mural artwork",
    ref: "ARCH-010",
    category: "Outdoor Murals",
    palette: 4,
    x: 1900, y: 1720, w: 340, h: 297, rotation: 4
  },
];

// scattered notes and stickies for the homepage canvas
const CANVAS_EXTRAS = [
  {
    id: "note-1",
    type: "sticky",
    text: "\" Placeholder notes here, thank you for coming to my art gallery\"  ",
    x: 2235, y: 157, w: 200, h: 180, rotation: -6
  },
  {
    id: "note-2",
    type: "paper-note",
    text: "all work is\na slow archive\nof attention.",
    x: 2501, y: 932, w: 240, h: 200, rotation: 5
  },
  {
    id: "arch-tag",
    type: "tag",
    text: "ARCHIVE · 2022–2024",
    x: 1787, y: 1450, w: 220, rotation: -3
  },
];

// === Artist bio (used in CV header) ===
const CV_BIO = {
  name: "Eunice Hannah Lim",
  alias: "1 is E.nuf",
  birthYear: "1992",
  location: "Singapore",
  paragraphs: [
    "Eunice Hannah Lim, also known as \"1 is E.nuf\" (b.1992, Singapore), is an artist inspired by documented narratives and our navigation through constructed spaces. Utilizing a myriad of mediums such as drawing, painting, street murals and assemblages, she crafts new shared experiences according to each unique location.",
    "Her work explores themes of history, placemaking, and community interactions with landscapes, reimagining how we connect with our surroundings today.",
    "Her notable public art murals in Singapore are: Cattleland, Book-A-Meeting and Folding Dreams. She uses the vibrancy of colors to convey culture and hopefully, a new layer of awareness to the place.",
    "Additionally, she partakes in collaborative ventures with companies and brands, crafting bespoke illustrations tailored to specific sites and event spaces.",
    "Eunice\u2019s works have been exhibited in Singapore, Australia, Turkey, and New York. She has been part of Artist-in-residence programmes such as Artsource Fremantle Residency (Perth, WA), BigCi Residency (Sydney), and NPE Art Residency (Singapore). She was one of the finalists for Red Gate Gallery & Beijing City International School (BCIS) Artist-in-residence programme in 2018."
  ],
  // Replace the file at this path with the real CV PDF when ready.
  // The Download CV button uses this URL directly (HTML `download` attribute).
  cvFile: "assets/eunice-hannah-lim-cv.pdf"
};

// === Selected Exhibitions Timeline ===
// Grouped by year (newest first). Each entry is one exhibition line.
const CV_TIMELINE = [
  { year: "2024", entries: [
    "Lub-dub, lub-dub, INSTINC Space, Singapore"
  ]},
  { year: "2022", entries: [
    "Food For Thought, Grids Coffee Gallery, Singapore"
  ]},
  { year: "2020", entries: [
    "Portal, The Starving Artists (SG) x Paper Mountain (WA), DECK",
    "Pameran Poskad, ION Art Gallery, Singapore"
  ]},
  { year: "2019", entries: [
    "SG Art Book Fair, Gillman Barracks, Singapore",
    "The Uncanned Exhibition, Grids & Circles, Singapore"
  ]},
  { year: "2018", entries: [
    "Open Spaces, FLUX-KIT-MEL, Abbotsford Convent, Melbourne",
    "Pameran Poskad, ION Art Gallery, Singapore"
  ]},
  { year: "2017", entries: [
    "Placeholders, La Salle Street, Singapore",
    "Instinctive 1.0: In(visible), ION Art Gallery, Singapore",
    "Flagship Genius, Ngee Ann Kongsi NAFA Gallery 2, Singapore"
  ]},
  { year: "2016", entries: [
    "Savour The Arts, The Coffee Connoisseur @ VivoCity",
    "Liminal State, Mizuma Gallery, Singapore",
    "Open Day BigCi Artist-in-residence, Sydney, Australia"
  ]},
  { year: "2015", entries: [
    "The Art of Giving, Scotts Square, Wheelock Properties, Singapore",
    "Bank Art Fair, Pan Pacific Hotel, Singapore",
    "Affordable Art Fair, F1 Pit Building, Singapore",
    "Remembering LKY, INSTINC space & OneRaffles Place, Singapore"
  ]},
  { year: "2014", entries: [
    "Project X-pired, City Square Mall, Singapore",
    "sMall iDeas, FASS Gallery, Sabanci University, Tuzla, Turkey",
    "From The Ground Up, LASALLE College of the Art",
    "Sweeten The Pill, Artspace222, Singapore",
    "Bildungsroman, Press Play, National Library Board, Singapore",
    "Ready-made, Minimart, The Substation, Singapore"
  ]},
  { year: "2013", entries: [
    "VERVE an arts festival, The Arts House, Singapore",
    "Young Talent Programme, Affordable Art Fair, Singapore",
    "\u201cIf The World Changed\u201d, Noise Singapore, SAM 8Q, Singapore",
    "The Story of the Creative, See.Me Gallery, Angel Orensanz Foundation of Contemporary Art, New York",
    "Worlds Apart Fair, Hotel Art Fair, Conrad Centennial, Singapore",
    "Celebrating Women, One East Asia, Singapore"
  ]},
  { year: "2012", entries: [
    "STIR UP, Talent Cafe Anniversary, Talent Cafe, Singapore",
    "On The Dot, NAFA Gallery 1 & 2, Singapore",
    "The Sketchbook Project, Brooklyn Art Library, New York",
    "Collective Individuality, Goodman Art Centre, Singapore",
    "Noise Singapore Showcase Exhibition, ION Orchard, Singapore"
  ]},
  { year: "2011", entries: [
    "Art Garage: Art The Hall, The Arts House, Singapore",
    "Square Invasion \u2013 The 50cm x 50cm Painting Show, INSTINC, Singapore",
    "Image of Images, ANATA Gallery, USA, LA"
  ]}
];

// === Press / commissions / awards archive sections ===
const CV_PRESS_PRINT = [
  "8 DAYS MAGAZINE (ISSUE 1340)",
  "CATALOG MAGAZINE",
  "CUSINE WINE ASIA (SEP\u201912)",
  "EPICURE ASIA",
  "PRAXIS PRESS 2015",
  "TABLA! (24 JAN\u201917)",
  "TALKING POINT, EP33",
  "THE STRAITS TIMES",
  "\u8054\u5408\u65e9\u62a5 (27JUN\u201914, PG 17)"
];

const CV_PRESS_ONLINE = [
  "Singapore Book of Records — Largest Chinese Zodiac Yusheng",
  "\u5168\u6c11\u51fa\u6765\u8d70\u8d70 SG EXPLORERS EP1",
  "\u524d\u7ebf\u8ffd\u8e2a FRONTLINE, EP 25",
  "DISCOVERSG Interview",
  "MCCY Artist Feature (Street Art)",
  "The Jarkata Post (5 JUL\u201917)",
  "The New Paper",
  "Archiwalks Cattleland Interview",
  "Today Online (11 JAN\u201917)",
  "Timeout Singapore — Start with Art",
  "AWLI Art Walk Little India",
  "Artitute (Young Talent Programme, \u201c.\u201d Solo Exhibition)"
];

const CV_COMMISSIONS = [
  "ESPLANADE VISUAL ARTS",
  "ESSEC BUSINESS SCHOOL",
  "LASALLE COLLEGE OF THE ARTS",
  "IBM",
  "NATIONAL ARTS COUNCIL (NAC)",
  "NATIONAL HERITAGE BOARD (NHB)",
  "MLA SPECIAL EVENTS",
  "ONE FARRER (HOTEL & HOSPITAL)",
  "PASSION ARTS (PA)",
  "SCAPE* SINGAPORE",
  "SINGAPORE TOURISM BOARD (STB)",
  "SINGAPORE RED CROSS",
  "TSUBURAYA PRODUCTIONS",
  "UNDER ARMOUR"
];

const CV_AWARDS = [
  { year: "2016", entries: [
    "Silver — New York TV & Films award, \u201cThe Worlds of Georgette Chen\u201d"
  ]},
  { year: "2011", entries: [
    "Square Invasion People\u2019s Prize, 50 x 50 Painting Exhibition, INSTINC Gallery, Singapore",
    "Consolation Prize, Ice Road Truckers Competition, History Channel, Singapore"
  ]}
];

const BLOG_POSTS = [
  {
    id: "texture-of-place",
    title: "The Texture of a Place",
    date: "March 2024",
    category: "Process",
    excerpt: "Notes on how locations influence colour, material, and visual storytelling.",
    body: "Every city I work in leaves a residue on the work — sometimes literally. Lisbon arrived as a pale ochre that I keep mixing back into other paintings. Accra gave me a particular red I could only find by grinding the soil itself. I've started thinking of palette less as a set of choices and more as a memory of where I've been.",
    side: "salt-bleached / sun-warmed / soft",
    tags: ["Journal", "Place", "Research"],
    pageNumber: "01",
    palette: 5
  },
  {
    id: "visual-diary",
    title: "Why I Keep a Visual Diary",
    date: "February 2024",
    category: "Reflection",
    excerpt: "A look into sketchbooks, unfinished ideas, and the quiet value of collecting fragments.",
    body: "Most of what is in the diary is bad. Most of what is in the diary will never become anything. But once a week, something small — a margin sketch, an overheard line — becomes the seed of an actual piece. The bad pages are not waste. They are compost.",
    side: "compost, not waste",
    tags: ["Journal", "Practice"],
    pageNumber: "02",
    palette: 4
  },
  {
    id: "colour-studies",
    title: "Colour Studies from the City",
    date: "January 2024",
    category: "Research",
    excerpt: "Observing palettes from streets, markets, architecture, and everyday rituals.",
    body: "I'll spend whole mornings on one corner with a small set of pencils — twelve colours, no more — trying to match exactly the pink of a peeling shopfront. It is a stupid, slow exercise. It is also the most useful thing I do.",
    side: "twelve pencils,\nno more",
    tags: ["Colour", "Cities", "Research"],
    pageNumber: "03",
    palette: 0
  },
  {
    id: "lived-in",
    title: "Making Work That Feels Lived-In",
    date: "December 2023",
    category: "Practice",
    excerpt: "Thoughts on imperfection, warmth, and building visual worlds with personality.",
    body: "I distrust paintings that look brand new. Not because newness is bad, but because nothing in life arrives that way. I am trying to make work that already has a memory inside it — small wear, small smudge, the feeling of a thing that has been carried.",
    side: "small wear,\nsmall smudge",
    tags: ["Process", "Reflection"],
    pageNumber: "04",
    palette: 2
  },
];

const ARTIST = {
  name: "About Eunice",
  role: "Artist Profile",
  bio: [
    "A visual artist inspired by historical narratives and the way we navigate through constructed spaces. Utilizing a diverse range of mediums—including drawing, painting, and street murals—she weaves complex storytelling elements into her work to create new, shared experiences for her audience.",
    "Eunice\u2019s practice explores themes of heritage, culture, and place making, examining how communities respond to their surrounding landscapes. Her work has been exhibited internationally, spanning Singapore, Australia, China, France, Hong Kong, Indonesia, New York, Philippines, and Türkiye. She has participated in prestigious artist-in-residence programs, including the Artsource Fremantle Residency (Perth, WA), BigCi Residency (Sydney), and NPE Art Residency (Singapore). In 2018, she was a finalist for the Red Gate Gallery & Beijing City International School (BCIS) Artist-in-Residence program.",
    "Born and raised in Singapore, Eunice graduated in 2014 with a Bachelor of Arts (Hons) from Goldsmiths, University of London, in partnership with LASALLE College of the Arts."
  ],
  metaRow: ["Based in Singapore", "Drawing", "Painting", "Street Murals"]
};

Object.assign(window, {
  ARTWORKS, CANVAS_EXTRAS, BLOG_POSTS, ARTIST,
  CV_BIO, CV_TIMELINE, CV_PRESS_PRINT, CV_PRESS_ONLINE, CV_COMMISSIONS, CV_AWARDS,
  ArtPlaceholder, ARTWORK_PALETTES
});
