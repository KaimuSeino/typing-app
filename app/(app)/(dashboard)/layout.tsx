import Sidebar from "@/components/sidebar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <div className="flex h-full w-60 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="pl-60 h-screen">
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;