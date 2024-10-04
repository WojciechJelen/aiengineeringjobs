import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const job = pgTable("job", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  tags: text("tags").array(),
  company: text("company").notNull(),
  companyWebsite: text("company_website"),
  location: text("location").notNull(),
  isRemote: boolean("is_remote").default(false).notNull(),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  currency: text("currency"),
  jobType: text("job_type").notNull(),
  experienceLevel: text("experience_level").notNull(),
  educationLevel: text("education_level"),
  requiredSkills: text("required_skills").array().notNull(),
  preferredSkills: text("preferred_skills").array(),
  applicationUrl: text("application_url"),
  contactEmail: text("contact_email"),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertJobSchema = createInsertSchema(job, {
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z.string().min(1, "Description is required"),
  company: z.string().min(1, "Company name is required"),
  companyWebsite: z.string().url("Must be a valid URL").optional(),
  location: z.string().min(1, "Location is required"),
  salaryMin: z
    .number()
    .int("Must be an integer")
    .positive("Must be a positive number")
    .optional(),
  salaryMax: z
    .number()
    .int("Must be an integer")
    .positive("Must be a positive number")
    .optional(),
  currency: z.string().optional(),
  jobType: z.string().min(1, "Job type is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  educationLevel: z.string().optional(),
  tags: z.array(z.string()).optional(),
  requiredSkills: z
    .array(z.string())
    .min(1, "At least one required skill is needed"),
  preferredSkills: z.array(z.string()).optional(),
  applicationUrl: z.string().url("Must be a valid URL").optional(),
  contactEmail: z.string().email("Must be a valid email address").optional(),
});

export const selectJobSchema = createSelectSchema(job);

export type JobType = typeof job.$inferSelect;
