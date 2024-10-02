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
  tags: z.array(z.string()),
  requiredSkills: z.array(z.string()),
  preferredSkills: z.array(z.string()),
});
export const selectJobSchema = createSelectSchema(job);
