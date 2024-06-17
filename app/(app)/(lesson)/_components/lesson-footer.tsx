"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LessonFooterProps {
  isCompletedWords: boolean
}

const LessonFooter = ({
  isCompletedWords
}: LessonFooterProps) => {
  const router = useRouter()

  const onClick = () => {
    if (!isCompletedWords) {
      router.push("/learn")
    }
  }
  return (
    <div className="w-screen h-[100px] border-t border-t-slate-500 mt-4 flex justify-end items-center">
      <Button
        className="mr-20"
        onClick={onClick}
      >
        終了する
      </Button>
    </div>
  );
}

export default LessonFooter;