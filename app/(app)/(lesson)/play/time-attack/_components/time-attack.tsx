"use client"

import { useState } from "react";
import Link from "next/link";
import TimeAttackPlay from "./time-attack-play";

type words = {
  id: string;
  english: string;
  japanese: string;
  mp3Path: string;
}[]

interface LessonProps {
  words: words
  userId: string
}

const TimeAttack = ({
  words,
  userId
}: LessonProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing(current => !current)
  return (
    <div>
      {isEditing ? (
        <TimeAttackPlay getWords={words} userId={userId} />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={toggleEdit}
          >
            スタート
          </button>
          <div>
            <Link
              href="/learn"
              className="text-blue-500"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

export default TimeAttack;