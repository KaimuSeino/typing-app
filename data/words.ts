import { db } from "@/lib/db";

export const getWords = async () => {
  try {
    const words = await db.word.findMany();
    return words;
  } catch (error) {
    console.error("Error fetching words:", error); // エラーログを追加
    return null;
  }
}

export const getUserProgress = async (userId: string) => {
  try {
    const userProgress = await db.userWordProgress.findMany({
      where: {
        userId
      },
      include: {
        word: {
          select: {
            english: true,
            japanese: true
          }
        }
      },
      orderBy: {
        count: "desc"
      }
    })

    const transformedProgress = userProgress.map(progress => ({
      userId: progress.userId,
      wordId: progress.wordId,
      english: progress.word.english,
      japanese: progress.word.japanese,
      count: progress.count
    }));

    return transformedProgress
  } catch (error) {
    console.log("Error fetching userProgress:", error)
    return null
  }
}

export const saveProgress = async (userId: string, wordId: string) => {
  try {
    const response = await fetch(`api/progress`, {
      method: "POST",
      headers: {
        "Comtent-type": "application/json"
      },
      body: JSON.stringify({ userId, wordId })
    })

    if (!response.ok) {
      throw new Error("progressが保存されませんでした")
    }

    const data = await response.json();
  } catch (err) {
    console.log('Error saving progress:', err)
  }
}