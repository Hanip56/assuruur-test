import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/profil`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/pendaftaran`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.6,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/kontak`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.6,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/fasilitas`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.6,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/sejarah`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 0.6,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/informasi`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.3,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/foto`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.3,
    },
  ];
}
