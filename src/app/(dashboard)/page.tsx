import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

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
    <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkspaceForm />
    </div>
  );
}
