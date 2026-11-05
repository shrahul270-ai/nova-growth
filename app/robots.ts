import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // De-index all vercel.app preview/staging URLs from Google & search engines
  if (host.includes("vercel.app")) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

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