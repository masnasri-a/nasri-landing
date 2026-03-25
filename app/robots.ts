import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cms/",
    },
    sitemap: "https://nasriadzlani.dev/sitemap.xml",
  };
}
