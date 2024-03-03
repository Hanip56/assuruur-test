import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://assuruurponpes.ac.id`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 1,
    },
    {
      url: `https://assuruurponpes.ac.id/profil`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.8,
    },
    {
      url: `https://assuruurponpes.ac.id/pendaftaran`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.6,
    },
    {
      url: `https://assuruurponpes.ac.id/kontak`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.6,
    },
    {
      url: `https://assuruurponpes.ac.id/fasilitas`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.6,
    },
    {
      url: `https://assuruurponpes.ac.id/sejarah`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.6,
    },
    {
      url: `https://assuruurponpes.ac.id/informasi`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.5,
    },
    {
      url: `https://assuruurponpes.ac.id/search`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.3,
    },
    {
      url: `https://assuruurponpes.ac.id/foto`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.3,
    },
  ];
}
