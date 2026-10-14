import { AdministratorsContainer } from "@/features/admin/adminstrators/components/AdministratorsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administrator Management | Admin Portal",
  description:
    "Provision and manage system administrator privileges and accounts.",
};

export default function AdministratorsPage() {
  return <AdministratorsContainer />;
}
