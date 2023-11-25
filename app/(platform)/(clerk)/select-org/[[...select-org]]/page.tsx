import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganisationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterCreateOrganizationUrl="/organization/:id"
      afterSelectOrganizationUrl="/organization/:id"
    />
  );
}
