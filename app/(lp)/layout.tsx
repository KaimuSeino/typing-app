import Header from "./_components/header";

const LpLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <header className="w-full h-[80px] border-b ">
        <Header />
      </header>
      <main className="w-full flex flex-col items-center">
        {children}
      </main>
    </>
  );
}

export default LpLayout;