export default function OrganizationPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId } = params;

  return <div className="">OrganizationPage {organizationId}</div>;
}
