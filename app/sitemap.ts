import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = { languages: { fr: `${SITE_URL}/`, en: `${SITE_URL}/en` } };
  return [
    { url: `${SITE_URL}/`, alternates },
    { url: `${SITE_URL}/en`, alternates },
  ];
}
