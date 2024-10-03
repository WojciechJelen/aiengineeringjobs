import { getJobs } from "@/lib/actions/job-actions";

export async function JobBoard() {
  const jobs = await getJobs();

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>{job.title}</div>
      ))}
    </div>
  );
}
