import { publicProcedure, router } from "./trpc";
import { db } from "@/db/drizzle";
import { insertJobSchema, job } from "@/db/schema";

export const appRouter = router({
  getJobs: publicProcedure.query(async () => {
    const data = await db.select().from(job);
    return data;
  }),
  addJob: publicProcedure.input(insertJobSchema).mutation(async ({ input }) => {
    const newJob = insertJobSchema.parse(input);

    const result = await db.insert(job).values(newJob).returning();
    return result;
  }),
});

export type AppRouter = typeof appRouter;
