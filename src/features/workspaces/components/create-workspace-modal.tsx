"use client";

import { ResponsiveModel } from "@/components/responsive-model";

import { CreateWorkspaceForm } from "./create-workspace-form";

export const CreateWorkspaceModal = () => {
  return (
    <ResponsiveModel open onOpenChange={() => {}}>
      <CreateWorkspaceForm />
    </ResponsiveModel>
  );
};