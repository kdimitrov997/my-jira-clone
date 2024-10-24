import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";

/**
 * The dashboard page.
 *
 * If the user is not logged in, redirect them to the login page.
 *
 * @returns The dashboard page.
 */
export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in"); // check if you need to delete this redirect later on

  return (
    <div className="">
      This is a home page
    </div>
  );
}
