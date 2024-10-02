"use client";

import { trpc } from "@/app/_trpc/client";

export function JobBoard() {
  const jobs = trpc.getJobs.useQuery();

  if (!jobs.data) return <div>Loading...</div>;

  return (
    <div>
      {jobs.data.map((job) => (
        <div key={job.id}>{job.title}</div>
      ))}
    </div>
  );
}
