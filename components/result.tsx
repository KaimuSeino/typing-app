import Link from "next/link";
import { Word } from "@/types";

interface ResultProps {
  words: Word[]
}

const Result = ({
  words
}: ResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-xl">Result!</h2>
      <div className="flex space-y-2 justify-center items-center max-w-[calc(100vh-100px)] overflow-scroll">
        {words.map((word) => (
          <div
            key={word.id}
            className="border rounded-md p-2 m-2 w-full"
          >
            {word.english}: {word.japanese}
          </div>
        ))}
      </div>
      <div className="p-4">
        <Link
          href="/learn"
          className="text-blue-500"
        >
          ホームへ
        </Link>
      </div>
    </div>
  );
}

export default Result;