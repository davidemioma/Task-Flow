export default function OrganizationPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId } = params;

  return <div className="mt-20">OrganizationPage {organizationId}</div>;
}
