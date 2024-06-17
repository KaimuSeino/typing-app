"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";
import styles from './css/Test.module.css'; // CSS module をインポート
import { saveProgress } from "@/data/words";
import { Word } from "@/types";
import { Progress } from "@/components/ui/progress";
import Result from "../../../../../../components/result";
import LessonFooter from "@/app/(app)/(lesson)/_components/lesson-footer";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

interface TestProps {
  getWords: Word[];
  userId: string;
}

const TimeAttackPlay = ({ getWords, userId }: TestProps) => {
  const [words, setWords] = useState<Word[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [keySound, setKeySound] = useState<HTMLAudioElement | null>(null); // key-sound.mp3 の追加
  const [keyMissSound, setKeyMissSound] = useState<HTMLAudioElement | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [status, setStatus] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [correctJapanese, setCorrectJapanese] = useState("");
  const [errorCount, setErrorCount] = useState(0);
  const [completedWords, setCompletedWords] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef("");

  useEffect(() => {
    // 10個の単語を取得してstatusにセットする
    if (getWords.length > 0) {
      const shuffledWords = shuffleArray(getWords).slice(0, 10);
      setWords(shuffledWords);
      setStatus(Array(shuffledWords[0].english.length).fill("black"));
    }
  }, [getWords]);

  useEffect(() => {
    if (words.length > 0) {
      // currentWordIndexまたはwordsが変更された場合に実行される
      const audioElement = new Audio(words[currentWordIndex].mp3Path);
      audioElement.load();
      setAudio(audioElement);
    }
  }, [currentWordIndex, words]);

  useEffect(() => {
    // タイピングをした後のkeySoundを入手
    const keySoundElement = new Audio('/key-sound.mp3');
    const keymissSoundElement = new Audio("/miss.mp3");
    keySoundElement.load();
    keymissSoundElement.load();
    setKeySound(keySoundElement);
    setKeyMissSound(keymissSoundElement);
  }, []);

  // タイピングを押した時に処理する部分
  const handleKeyPress = (e: KeyboardEvent) => {
    // enterとかspaceとかを省く
    if (e.key.length > 1 || isCompleted) return;

    inputRef.current += e.key
    const newInput = inputRef.current;
    const targetText = words[currentWordIndex].english

    if (!targetText.startsWith(newInput)) {
      // 入力が間違っている場合の処理
      if (keyMissSound) {
        keyMissSound.currentTime = 0;
        keyMissSound.play().catch((error) => {
          console.log("Error play key sounds:", error)
        })
      }
      setErrorCount((prevCount) => prevCount + 1);
      setStatus((prevStatus: string[]) => {
        // prevStatus: ["black", "black", ...]
        const newStatus = [...prevStatus];
        newStatus[newInput.length - 1] = "red";
        return newStatus
      });
      inputRef.current = inputRef.current.slice(0, -1)
    } else {
      // とりあえず音ならす
      if (keySound) {
        keySound.currentTime = 0;
        keySound.play().catch((error) => {
          console.log("Error play key sounds:", error)
        })
      }
      // 入力が正しい場合の処理
      setErrorCount(0);
      setStatus((prevStatus: string[]) => {
        const newStatus = [...prevStatus];
        newStatus[newInput.length - 1] = "green";
        return newStatus
      })

      // 全て一致した場合の処理
      if (newInput === targetText) {
        // とりあえず音ならす
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch((error) => {
            console.log("Error playing audio:", error)
          })
        }
        setCorrect(true)
        setCorrectJapanese(words[currentWordIndex].japanese)
        saveProgress(userId, words[currentWordIndex].id)

        setCompletedWords((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount === words.length) {
            setTimeout(() => {
              setIsCompleted(true);
            }, 1500)
          }
          return newCount
        })

        setTimeout(() => {
          // 全ての単語をコンプリートしていない時に実行
          if (completedWords + 1 < words.length) {
            setCorrect(false);
            setCorrectJapanese("");
            inputRef.current = ""
            setCurrentWordIndex((prev) => prev + 1)
            setStatus(Array(words[currentWordIndex + 1].english.length).fill("black"));
          }
        }, 1000)
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentWordIndex, audio, keySound, isCompleted]);

  const progressValue = (completedWords / words.length) * 100;

  if (isCompleted) {
    return <Result words={words} />;
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div className="w-[1000px] p-8">
        <Progress value={progressValue} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-bold">
          {status.length > 0 && words.length > 0 && words[currentWordIndex].english.split("").map((char, index) => (
            <span
              key={index}
              className={status[index] === 'red' && errorCount > 0 ? styles.bounce : ""}
              style={{ color: status[index] }}
            >
              {char}
            </span>
          ))}
        </div>
        {correct && <div className="text-2xl font-bold text-green-500">{correctJapanese}</div>}
      </div>
      <LessonFooter isCompletedWords={!!completedWords} />
    </div>
  );
};

export default TimeAttackPlay;
