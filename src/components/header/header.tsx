import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4">
      <nav>
        <ul>
          <li>
            <Link className={buttonVariants({ variant: "link" })} href="/">
              Home
            </Link>
            <Link className={buttonVariants({ variant: "link" })} href="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/add-job"
        >
          Add Job
        </Link>
      </div>
    </header>
  );
}
