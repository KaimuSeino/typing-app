import { auth } from "@/auth";
import Lesson from "@/components/lesson";
import { getWords } from "@/data/words";


const LessonPage = async () => {
  const words = await getWords()
  const session = await auth()
  const userId = session?.user.id as string

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <Lesson words={words!} userId={userId} />
      </div>
    </div>
  );
}

export default LessonPage;