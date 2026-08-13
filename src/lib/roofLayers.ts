export type RoofLayer = {
  id: string;
  index: number;
  label: string;
  material: string;
  description: string;
  height: number; // relative band height inside the cross-section viewBox
};

// Bottom to top, matching a real flat-roof build-up.
export const roofLayers: RoofLayer[] = [
  {
    id: "nosna",
    index: 1,
    label: "Nosná konstrukce",
    material: "Trapézový plech / beton",
    description: "Základ skladby, který přenáší veškeré zatížení střechy do budovy.",
    height: 92,
  },
  {
    id: "parozabrana",
    index: 2,
    label: "Parozábrana",
    material: "Asfaltový pás / fólie",
    description: "Brání vodní páře z interiéru vniknout do tepelné izolace a srážet se v ní.",
    // min ~36 so index chips (r=15) don't collide with neighbours
    height: 36,
  },
  {
    id: "izolace",
    index: 3,
    label: "Tepelná izolace",
    material: "EPS / minerální vlna",
    description: "Tloušťka podle tepelně-technického posudku, často ve spádových klínech.",
    height: 108,
  },
  {
    id: "separace",
    index: 4,
    label: "Separační vrstva",
    material: "Geotextilie / fólie",
    description: "Odděluje izolaci od hydroizolace a chrání ji před protlačením.",
    height: 36,
  },
  {
    id: "hydroizolace",
    index: 5,
    label: "Hydroizolační fólie",
    material: "mPVC fólie / SBS pás",
    description: "Svařované spoje. Sem dopadá voda — a odtud musí bezpečně odtéct.",
    height: 36,
  },
];
