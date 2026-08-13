import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.sopat.cz";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/realizace`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sluzby`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/skladba-strechy`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/kde-pracujeme`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/gdpr`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
