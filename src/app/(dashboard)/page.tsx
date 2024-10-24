import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in"); // check if you need to delete this redirect later on

  return (
    <div className="">
      <UserButton />
    </div>
  );
}
