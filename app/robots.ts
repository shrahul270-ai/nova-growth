import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://balajiprimemedia.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/buyer-dashboard/", "/upload-database/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}