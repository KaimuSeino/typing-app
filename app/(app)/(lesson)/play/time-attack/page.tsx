import { auth } from "@/auth";
import { getWords } from "@/data/words";
import TimeAttack from "./_components/time-attack";

const TimeAttackPage = async () => {
  const words = await getWords()
  const session = await auth()
  const userId = session?.user.id as string

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <TimeAttack words={words!} userId={userId} />
      </div>
    </div>
  );
}

export default TimeAttackPage;