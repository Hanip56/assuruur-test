import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://assuruur.or.id`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 1,
    },
    {
      url: `https://assuruur.or.id/profil`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.8,
    },
    {
      url: `https://assuruur.or.id/pendaftaran`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.6,
    },
    {
      url: `https://assuruur.or.id/kontak`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.6,
    },
    {
      url: `https://assuruur.or.id/fasilitas`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.6,
    },
    {
      url: `https://assuruur.or.id/sejarah`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.6,
    },
    {
      url: `https://assuruur.or.id/informasi`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.5,
    },
    {
      url: `https://assuruur.or.id/search`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.3,
    },
    {
      url: `https://assuruur.or.id/foto`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.3,
    },
  ];
}
