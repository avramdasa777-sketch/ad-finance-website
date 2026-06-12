import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://ad-finance.co.il', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://ad-finance.co.il/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://ad-finance.co.il/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://ad-finance.co.il/services/insurance', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://ad-finance.co.il/services/pension', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://ad-finance.co.il/services/financial', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://ad-finance.co.il/info', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://ad-finance.co.il/info/keren-pensiya', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/bituach-menahilim', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/keren-hishtalmut', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/kupat-gemel', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/kupat-gemel-hashkaa', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/polisa-hisachon', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/nihul-tikkim', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/info/hashkaot-alternativiot', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://ad-finance.co.il/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
  ];
}