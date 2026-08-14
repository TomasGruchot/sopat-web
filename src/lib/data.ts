// Verified company data sourced from sopat.cz (Aug 2026 research pass) plus the client brief.
// Real project figures (m2 / location / insulation type) come directly from
// sopat.cz/realizovane-projekty and take priority over secondary sources.

export const company = {
  name: "SOPAT.CZ s.r.o.",
  founded: 2000,
  ic: "25857282",
  dic: "CZ25857282",
  phone: "585 531 445",
  phoneHref: "+420585531445",
  email: "info@sopat.cz",
  iso: "ISO 9001",
  insurer: "ČPP",
  regions: [
    "Hlavní město Praha",
    "Středočeský kraj",
    "Jihočeský kraj",
    "Plzeňský kraj",
    "Karlovarský kraj",
    "Ústecký kraj",
    "Liberecký kraj",
    "Královéhradecký kraj",
    "Pardubický kraj",
    "Kraj Vysočina",
    "Jihomoravský kraj",
    "Olomoucký kraj",
    "Moravskoslezský kraj",
    "Zlínský kraj",
  ],
  countries: ["Česká republika", "Slovensko"] as const,
};

export const branches = [
  {
    id: "hq",
    title: "Sídlo — vedení firmy",
    address: "Sobáčov 3, 783 21 Mladeč (u Litovle)",
    phone: "585 347 072",
    email: "info@sopat.cz",
    lat: 49.696336,
    lon: 17.036971,
    contacts: [
      { name: "Pavel Papula", role: "jednatel", phone: "602 705 147", email: "pavel.papula@sopat.cz" },
      { name: "Jitka Papulová", role: "administrativa", phone: "724 554 220", email: "jitka.papulova@sopat.cz" },
    ],
  },
  {
    id: "olomouc",
    title: "Pobočka Olomouc",
    address: "Holická 568/31, 772 00 Olomouc – Hodolany",
    phone: "585 531 445",
    email: "info@sopat.cz",
    lat: 49.583912,
    lon: 17.273059,
    contacts: [
      { name: "Petr Můčka", role: "vedoucí realizace", phone: "606 230 025", email: "petr.mucka@sopat.cz" },
      { name: "Jaroslav Petrů", role: "technik", phone: "725 711 622", email: "jaroslav.petru@sopat.cz" },
      { name: "Helena Anderová", role: "administrativa", phone: "601 188 858", email: "helena.anderova@sopat.cz" },
    ],
  },
  {
    id: "blansko",
    title: "Pobočka Blansko",
    address: "Dolní Lhota 82, 678 01 Blansko",
    phone: "723 767 877",
    email: "info@sopat.cz",
    lat: 49.3597,
    lon: 16.6802,
    contacts: [
      { name: "Milan Svoboda", role: "jednatel / vedoucí pobočky", phone: "723 767 877", email: "milan.svoboda@sopat.cz" },
    ],
  },
];

export type Service = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  image?: string;
  size: "large" | "medium" | "small";
};

export const services: Service[] = [
  {
    id: "hydroizolace",
    label: "Hydroizolace plochých střech",
    eyebrow: "01 / hlavní obor",
    description:
      "Nová hydroizolace i výměna staré skladby — mPVC fólie, SBS pásy, mechanicky kotvené i celoplošně lepené systémy.",
    image: "/images/bazen-olomouc-2.jpg",
    size: "large",
  },
  {
    id: "sikme",
    label: "Šikmé střechy a krytiny",
    eyebrow: "02",
    description: "Pálené i plechové krytiny, oplechování hřebenů a údolí, kompletní tesařské práce na krovu.",
    image: "/images/sikme-strechy.jpg",
    size: "medium",
  },
  {
    id: "sanace",
    label: "Sanace, opravy a rekonstrukce střech",
    eyebrow: "03",
    description: "Lokalizace zatékání sondami, oprava kotvení, celoplošná rekonstrukce bez bourání nosné konstrukce.",
    image: "/images/bitumen-detail-brno-1.jpg",
    size: "medium",
  },
  {
    id: "zatepleni",
    label: "Zateplení střech",
    eyebrow: "04",
    description: "EPS, minerální vlna nebo spádové klíny — návrh tloušťky izolace na míru tepelně-technickému posudku.",
    image: "/images/zatepleni-fasady.jpg",
    size: "medium",
  },
  {
    id: "spodni-stavby",
    label: "Izolace spodních staveb",
    eyebrow: "05",
    description: "Hydroizolace základů a suterénů proti vlhkosti a radonu, sanace vlhkého zdiva.",
    image: "/images/strip-zaklady.jpg",
    size: "small",
  },
  {
    id: "klempirske",
    label: "Klempířské práce včetně nátěrů",
    eyebrow: "06",
    description: "Oplechování atik, parapetů a prostupů, žlaby a svody, ochranné nátěry proti korozi.",
    image: "/images/strip-parapet-2.jpg",
    size: "small",
  },
  {
    id: "hromosvody",
    label: "Opravy a revize hromosvodů",
    eyebrow: "07",
    description: "Revize dle ČSN EN 62305, opravy a montáž bleskosvodné soustavy při rekonstrukci střechy.",
    image: "/images/hromosvod-detail.jpg",
    size: "small",
  },
  {
    id: "projekty",
    label: "Technologické návrhy a projektová dokumentace",
    eyebrow: "08",
    description: "Bezplatné technické poradenství, návrh skladby, kalkulace a projektová dokumentace pro stavební povolení.",
    image: "/images/projektova-dokumentace.jpg",
    size: "small",
  },
  {
    id: "dodavky",
    label: "Dodávka krytin, oken, světlíků a vtoků",
    eyebrow: "09",
    description: "Střešní okna, světlíky, odvětrávací komínky a vtoky včetně montáže a zaškolení správce objektu.",
    image: "/images/strip-svetliky.jpg",
    size: "small",
  },
];

export const materials = [
  { name: "ALKORPLAN", category: "mPVC fólie" },
  { name: "SIKA / SARNAFIL", category: "mPVC / TPO fólie" },
  { name: "PLUVITEC", category: "modifikované asfaltové pásy" },
  { name: "ICOPAL", category: "asfaltové pásy" },
  { name: "VEDAG", category: "asfaltové hydroizolace" },
  { name: "ROCKWOOL", category: "minerální tepelná izolace" },
  { name: "ISOVER-ORSIL", category: "minerální a skelná izolace" },
  { name: "STYROTRADE", category: "pěnový polystyren EPS/XPS" },
  { name: "RIGIPS", category: "sádrokartonové systémy" },
];

export type Project = {
  id: string;
  name: string;
  place: string;
  area: string;
  insulation: string;
  image?: string;
};

// Sourced directly from sopat.cz/realizovane-projekty (page 1, live data).
export const projects: Project[] = [
  {
    id: "prostejov-zimni-stadion",
    name: "Zimní stadion Prostějov",
    place: "Prostějov",
    area: "3 800 m²",
    insulation: "mPVC fólie",
    image: "/images/zimni-stadion.jpg",
  },
  {
    id: "olomouc-bazen",
    name: "Plavecký bazén Olomouc",
    place: "Olomouc",
    area: "5 000 m²",
    insulation: "mPVC fólie",
    image: "/images/bazen-olomouc-1.jpg",
  },
  {
    id: "letovice-krejciho",
    name: "BD Alberta Krejčího 20–26",
    place: "Letovice",
    area: "940 m²",
    insulation: "mPVC fólie",
    image: "/images/bytovy-dum-letovice.jpg",
  },
  {
    id: "slavicin-tvd",
    name: "TVD Slavičín, Divnice — II. etapa",
    place: "Slavičín",
    area: "2 900 m²",
    insulation: "mPVC fólie",
    image: "/images/hero-ceitec-noc.jpg",
  },
  {
    id: "vsetin-ms-ohrada",
    name: "MŠ Ohrada, Vsetín",
    place: "Vsetín",
    area: "900 m²",
    insulation: "mPVC fólie",
    image: "/images/materska-skola.jpg",
  },
  {
    id: "brno-kotelna",
    name: "Kotelna Dolnopolní",
    place: "Brno",
    area: "260 m²",
    insulation: "SBS asfaltový pás",
    image: "/images/bitumen-detail-brno-2.jpg",
  },
  {
    id: "blansko-okruzni",
    name: "BD Okružní 5, 7",
    place: "Blansko",
    area: "470 m²",
    insulation: "SBS asfaltový pás",
    image: "/images/fasada-blansko-2.jpg",
  },
  {
    id: "vsetin-benatky",
    name: "BD Benátky 1774",
    place: "Vsetín",
    area: "500 m²",
    insulation: "SBS asfaltový pás",
    image: "/images/bytovy-dum-benatky.jpg",
  },
  {
    id: "jesenik-galerie",
    name: "Obchodní galerie",
    place: "Jeseník",
    area: "2 800 m²",
    insulation: "mPVC fólie",
    image: "/images/obchodni-galerie.jpg",
  },
  {
    id: "senov-varroc",
    name: "Hala Varroc",
    place: "Šenov u Nového Jičína",
    area: "2 200 m²",
    insulation: "mPVC fólie",
    image: "/images/strecha-slavicin.jpg",
  },
  {
    id: "ujezd-dlmont",
    name: "Administrativní budova DL-mont",
    place: "Újezd",
    area: "2 000 m²",
    insulation: "mPVC fólie",
    image: "/images/administrativni-budova-ujezd.jpg",
  },
  {
    id: "olomouc-eluvio",
    name: "ELUVIO Olomouc",
    place: "Olomouc",
    area: "1 600 m²",
    insulation: "mPVC fólie",
    image: "/images/ceitec-brno-2.jpg",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Prohlídka a technický průzkum střechy",
    description: "Obhlídka na místě, fotodokumentace stávajícího stavu a vyhodnocení příčin poruch.",
  },
  {
    number: "02",
    title: "Sondy do skladby a tahové zkoušky kotvení",
    description: "Zjistíme skutečnou skladbu střechy a mechanickou odolnost kotvení pod povrchem.",
  },
  {
    number: "03",
    title: "Návrh technologie a cenová nabídka",
    description: "Technické řešení, výběr systému a bezplatná nabídka s rozpočtem na míru objektu.",
  },
  {
    number: "04",
    title: "Realizace vlastními pracovníky",
    description: "Práci provádí naši kvalifikovaní zaměstnanci — žádní náhodní subdodavatelé.",
  },
  {
    number: "05",
    title: "Úklid, odvoz suti, předání a dokumentace",
    description: "Staveniště po nás zůstává čisté, předání se zápisem a dokumentací skladby.",
  },
  {
    number: "06",
    title: "Záruční servis a pravidelné revize",
    description: "Sledujeme stav střechy po realizaci a řešíme případný servis v rámci záruky.",
  },
];

export const whySopat = [
  {
    title: "Vlastní zaměstnanci, ne subdodavatelé",
    description: "Na střeše stojí lidé, kterých se zeptáte na jméno a druhý den je znovu zastihnete.",
  },
  {
    title: "26 let na trhu a firma stále stojí",
    description: "Založena v roce 2000 lidmi, kteří už tehdy měli za sebou roky praxe na střechách.",
  },
  {
    title: "ISO 9001 a pojištěná odpovědnost",
    description: "Certifikovaný systém řízení kvality a krytí odpovědnosti pojistnou smlouvou u ČPP.",
  },
  {
    title: "Úklid a odvoz suti v ceně",
    description: "Po realizaci nezůstává na střeše ani na dvoře nic navíc — to řešíme za vás.",
  },
];

export const heroStats = [
  { value: 26, suffix: "", label: "let na trhu" },
  { value: 300, suffix: "+", label: "realizovaných střech" },
  { value: 0, suffix: "ISO 9001", label: "certifikace kvality", isText: true },
  { value: 0, suffix: "ČR + SK", label: "působnost", isText: true },
];
