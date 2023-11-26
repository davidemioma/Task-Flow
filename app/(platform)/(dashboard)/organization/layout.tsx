import Sidebar from "../_components/Sidebar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-6xl 2xl:max-w-screen-xl mx-auto pt-20 md:pt-24 px-4">
      <div className="flex gap-7">
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar />
        </div>

        {children}
      </div>
    </main>
  );
}
