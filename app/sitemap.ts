import { MetadataRoute } from "next";
import { blogPosts } from "./blog/blogData";
import { caseStudiesData } from "./projects/projectsData";
import { servicesData } from "./services/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://balajiprimemedia.in";

  // Realistic modification dates for service pages based on last content revisions
  const serviceDateMap: Record<string, string> = {
    "flutter-app-dev": "2026-11-14",
    "full-stack-php-dev": "2026-11-14",
    "seo-optimization": "2026-11-18",
    "website-development": "2026-11-18",
    "content-writing": "2026-11-08",
    "email-marketing": "2026-11-06",
    "off-page-seo-digital-pr": "2026-11-18",
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

  // Publication dates for verified editorial blog posts
  const blogDateMap: Record<string, string> = {
    "ecommerce-seo-scaling": "2026-10-24",
    "nextjs-vs-wordpress": "2026-09-28",
    "international-link-building": "2026-09-14",
    "google-maps-local-seo": "2026-08-25",
    "shopify-email-automation": "2026-08-10",
    "ai-search-overviews": "2026-07-28",
  };

  // High-Value Core Indexable Landing Pages (Excludes utility/internal pages: /audit, /feedback, /help-center, /schedule-meeting, /pay, /admin)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-11-20"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-11-20"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guest-posting`,
      lastModified: new Date("2026-11-20"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-11-18"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-10-24"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seo-services-usa`,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/web-development-uk`,
      lastModified: new Date("2026-11-15"),
      changeFrequency: "monthly",
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
      lastModified: new Date("2026-11-18"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-11-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Service Detail Pages (/services/...)
  const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(serviceDateMap[service.id] || "2026-11-18"),
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
