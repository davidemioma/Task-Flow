import OrgControl from "./_components/OrgControl";

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrgControl />

      {children}
    </>
  );
}
