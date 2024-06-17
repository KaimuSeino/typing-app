import { auth } from "@/auth";
import { UserButton } from "@/components/user-button";
import { UserInfo } from "@/components/user-info";
import { getUserProgress } from "@/data/words";
import Link from "next/link";


const LearnPage = async () => {
  const session = await auth()
  const userId = session?.user.id

  const userProgress = await getUserProgress(userId!)


  return (
    <div className="flex justify-between">
      <div className="p-6 font-mono">
        <div className="bg-blue-400 text-white w-[300px] rounded-xl flex justify-center">
          <p className="text-xl">lesson 一覧</p>
        </div>
        <div className="py-4 flex space-x-4">
          <div className="bg-slate-500 text-white w-[200px] rounded-2xl flex flex-col items-center hover:bg-slate-400">
            <Link
              href="/play"
            >
              <p>TOEICでよく出る単語</p>
              <p>
                71問から10問出る！
              </p>
            </Link>
          </div>
          <div className="bg-slate-500 text-white w-[200px] rounded-2xl flex flex-col items-center justify-center hover:bg-slate-400">
            <Link
              href="/play/time-attack"
            >
              <p>単語タイムアタック!</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col items-end gap-y-2">
        <UserButton />
        <UserInfo userId={userId!} userProgress={userProgress!} />
      </div>
    </div>
  );
}

export default LearnPage;