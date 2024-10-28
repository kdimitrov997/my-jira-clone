import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";
// import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";

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

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
};