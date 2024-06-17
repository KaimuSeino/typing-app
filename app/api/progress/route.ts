import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  const { userId, wordId } = await req.json()
  try {
    const existingProgress = await db.userWordProgress.findUnique({
      where: {
        user_word_index: {
          userId,
          wordId
        }
      }
    })

    let progress;

    if (existingProgress) {
      // すでに一度カウントされているwordの場合
      progress = await db.userWordProgress.update({
        where: {
          user_word_index: {
            userId,
            wordId
          }
        },
        data: {
          count: existingProgress.count + 1
        }
      })
    } else {
      // 初めてのword
      progress = await db.userWordProgress.create({
        data: {
          userId,
          wordId,
          count: 1
        }
      })
    }
    return NextResponse.json({ message: "データ成功", words: progress }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: "データ取得失敗" }, { status: 500 })
  }
}