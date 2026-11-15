import { MetadataRoute } from "next";
import { blogPosts } from "./blog/blogData";
import { caseStudiesData } from "./projects/projectsData";
import { servicesData } from "./services/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://balajiprimemedia.in";

  // Realistic modification dates for service pages
  const serviceDateMap: Record<string, string> = {
    "flutter-app-dev": "2026-11-14",
    "full-stack-php-dev": "2026-11-14",
    "seo-optimization": "2026-11-12",
    "website-development": "2026-11-12",
    "content-writing": "2026-11-08",
    "email-marketing": "2026-11-06",
    "backlink-building": "2026-11-10",
    "website-maintenance": "2026-11-05",
  };

  // Realistic modification dates for case study pages
  const caseStudyDateMap: Record<string, string> = {
    "local-growth": "2026-11-01",
    "fashion-brand": "2026-10-15",
    "fitness-app": "2026-10-02",
    "saas-pipeline": "2026-09-20",
    "fintech-app": "2026-09-05",
    "dubai-real-estate": "2026-08-30",
  };

  // Realistic publication/modification dates for blog posts
  const blogDateMap: Record<string, string> = {
    "ecommerce-seo-scaling": "2026-10-24",
    "nextjs-vs-wordpress": "2026-09-28",
    "international-link-building": "2026-09-14",
    "google-maps-local-seo": "2026-08-25",
    "shopify-email-automation": "2026-08-10",
    "ai-search-overviews": "2026-07-28",
  };

  // Core Pages (Excluding internal/payment pages like /pay, /admin, /buyer-dashboard)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-11-14"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guest-posting`,
      lastModified: new Date("2026-11-14"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seo-services-usa`,
      lastModified: new Date("2026-11-08"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/web-development-uk`,
      lastModified: new Date("2026-11-08"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date("2026-10-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date("2026-11-12"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-11-14"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: new Date("2026-11-13"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date("2026-11-13"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/schedule-meeting`,
      lastModified: new Date("2026-11-06"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic Service Detail Pages (/services/...)
  const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(serviceDateMap[service.id] || "2026-11-12"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Case Studies (/projects/...)
  const caseStudyPages: MetadataRoute.Sitemap = caseStudiesData.map((study) => ({
    url: `${baseUrl}/projects/${study.id}`,
    lastModified: new Date(caseStudyDateMap[study.id] || "2026-10-01"),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Dynamic Blog Posts (/blog/...)
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(blogDateMap[post.id] || "2026-09-01"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages, ...blogPostPages];
}