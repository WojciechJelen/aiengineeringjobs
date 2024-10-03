"use server";

import { db } from "@/db/drizzle";
import { insertJobSchema, job } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function getJobs() {
  const data = await db.select().from(job);
  return data;
}

export async function addJob(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedData = insertJobSchema.parse(rawFormData);

  const result = await db.insert(job).values(validatedData).returning();
  revalidatePath("/jobs");
  return result;
}
