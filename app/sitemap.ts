import { MetadataRoute } from "next";
import { blogPosts } from "./blog/blogData";
import { caseStudiesData } from "./projects/projectsData";
import { servicesData } from "./services/servicesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://balajiprimemedia.in";

  // Realistic modification dates for service pages based on latest content updates
  const serviceDateMap: Record<string, string> = {
    "flutter-app-dev": "2026-11-20",
    "full-stack-php-dev": "2026-11-20",
    "seo-optimization": "2026-11-25",
    "website-development": "2026-11-25",
    "content-writing": "2026-11-20",
    "email-marketing": "2026-11-24",
    "backlink-building": "2026-11-25",
    "website-maintenance": "2026-11-24",
  };

  // Realistic modification dates for case study pages
  const caseStudyDateMap: Record<string, string> = {
    "local-growth": "2026-11-20",
    "fashion-brand": "2026-11-20",
    "fitness-app": "2026-11-15",
    "saas-pipeline": "2026-11-15",
    "fintech-app": "2026-11-15",
    "dubai-real-estate": "2026-11-10",
  };

  // Publication dates for editorial blog posts
  const blogDateMap: Record<string, string> = {
    "ecommerce-seo-scaling": "2026-11-24",
    "nextjs-vs-wordpress": "2026-11-20",
    "international-link-building": "2026-11-18",
    "google-maps-local-seo": "2026-11-18",
    "shopify-email-automation": "2026-11-10",
    "ai-search-overviews": "2026-11-05",
  };

  // Primary Indexable Pages - Matches site navigation and footer architecture
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guest-posting`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seo-services-usa`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/web-development-uk`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/audit`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/schedule-meeting`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/help-center`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Service Detail Pages (/services/...)
  const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(serviceDateMap[service.id] || "2026-11-25"),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Case Studies (/projects/...)
  const caseStudyPages: MetadataRoute.Sitemap = caseStudiesData.map((study) => ({
    url: `${baseUrl}/projects/${study.id}`,
    lastModified: new Date(caseStudyDateMap[study.id] || "2026-11-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic Blog Posts (/blog/...)
  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(blogDateMap[post.id] || "2026-11-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages, ...blogPostPages];
}
