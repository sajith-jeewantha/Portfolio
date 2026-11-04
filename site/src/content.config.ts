/**
 * Content collections — every JSON file in src/data and every post in
 * src/content/blog is validated here at build time. A typo or a missing
 * field fails `npm run build` instead of breaking the live site.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const year = z.number().int().min(1990).max(2100);
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use "YYYY-MM", e.g. "2026-07"');

const experience = defineCollection({
  loader: file('src/data/experience.json'),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.url().optional(),
    logo: z.string(), // file name (without extension) in src/assets/icons
    type: z.enum(['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance']).default('Full-time'),
    location: z.string().optional(),
    start: yearMonth,
    end: yearMonth.nullable().default(null), // null = current role
    description: z.string(),
    highlights: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    order: z.number().default(99),
    visible: z.boolean().default(true),
  }),
});

const education = defineCollection({
  loader: file('src/data/education.json'),
  schema: z.object({
    degree: z.string(),
    school: z.string(),
    start: year,
    end: year.nullable(),
    status: z.enum(['completed', 'in-progress']),
    description: z.string(),
    highlights: z.array(z.string()).default([]),
    gpa: z.number().min(0).max(4).nullable().default(null),
    grade: z.string().nullable().default(null),
    order: z.number().default(99),
    visible: z.boolean().default(true),
  }),
});

const issuers = defineCollection({
  loader: file('src/data/issuers.json'),
  schema: z.object({
    name: z.string(),
    logo: z.string(), // file name (without extension) in src/assets/icons
  }),
});

const certifications = defineCollection({
  loader: file('src/data/certifications.json'),
  schema: z.object({
    title: z.string(),
    issuer: z.string(), // id from issuers.json
    year: year,
    month: z.number().int().min(1).max(12).optional(), // issue month, e.g. 10 = Oct
    expires: year.nullable().default(null),
    status: z.enum(['earned', 'in-progress']),
    url: z.url().nullable().default(null),
    description: z.string(),
    order: z.number().default(99),
    visible: z.boolean().default(true),
  }),
});

const projectCategories = defineCollection({
  loader: file('src/data/project-categories.json'),
  schema: z.object({
    label: z.string(),
    icon: z.string(), // lucide icon name
  }),
});

const projects = defineCollection({
  loader: file('src/data/projects.json'),
  schema: z.object({
    title: z.string(),
    year: year,
    status: z.enum(['completed', 'in-progress', 'published']),
    icon: z.string().default('folder-git-2'),
    categories: z.array(z.string()).default([]),
    description: z.string(),
    features: z.array(z.string()).default([]),
    tech: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          type: z.enum(['github', 'website', 'post', 'docker', 'video', 'other']),
          label: z.string(),
          url: z.url(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    visible: z.boolean().default(true),
  }),
});

const techCategories = defineCollection({
  loader: file('src/data/tech-categories.json'),
  schema: z.object({
    label: z.string(),
    icon: z.string(),
    order: z.number().default(99),
  }),
});

const technologies = defineCollection({
  loader: file('src/data/technologies.json'),
  schema: z.object({
    name: z.string(),
    category: z.string(), // id from tech-categories.json
    logo: z.string(), // file name (without extension) in src/assets/icons
    visible: z.boolean().default(true),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

/** Scripture — Douay–Rheims Bible (public domain, Catholic). */
const verses = defineCollection({
  loader: file('src/data/verses.json'),
  schema: z.object({
    theme: z.enum(['love', 'strength', 'relationship', 'other']),
    reference: z.string(),
    text: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    visible: z.boolean().default(true), // false = used only where referenced by id (e.g. 404)
  }),
});

export const collections = {
  verses,
  experience,
  education,
  issuers,
  certifications,
  projectCategories,
  projects,
  techCategories,
  technologies,
  blog,
};
