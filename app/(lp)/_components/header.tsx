import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full h-full flex items-center justify-around">
      <div className="">
        <Image
          src="/e-type.png"
          alt="e-type"
          width={100}
          height={50}
        />
      </div>
      <nav className="flex space-x-6 font-mono text-[#8078ff]">
        <p className="cursor-pointer">
          Etypeとは？
        </p>
        <p className="cursor-pointer">
          料金プラン
        </p>
        <p className="cursor-pointer">
          ログイン
        </p>
      </nav>
    </div>
  );
}

export default Header;