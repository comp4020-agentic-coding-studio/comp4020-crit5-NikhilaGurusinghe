import Link from "next/link";
import { basePath } from "@/lib/base-path";

export default function NotFound() {
  return (
    <nav>
      <Link href={`${basePath}/`}>
        <h1 className="underline text-blue-700">{"<"} Return Home</h1> 404 not
        found
      </Link>
    </nav>
  );
}
