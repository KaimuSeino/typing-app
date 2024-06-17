"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";
import { DEFAUT_LOGIN_REDIRECT } from "@/routes"
import {
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/token";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTowFactorConfirmationByUserId } from "@/data/two-factor-confirmation";


export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "無効なフィールドです" };
  }

  const { email, password, code } = validatedFields.data;

  // メールアドレスに基づいてユーザーをデータベースから検索
  const existingUser = await getUserByEmail(email);

  // ユーザーが存在しない、またはユーザーのメールアドレスやパスワードがデータベースに登録されていない場合
  if (!existingUser || !existingUser.email || !existingUser.password) {
    // エラーメッセージを返して処理を終了
    return { error: "メールアドレスが存在しません！" }
  }

  // ユーザーのメールアドレスがまだ確認されていない場合
  if (!existingUser.emailVerified) {
    // メール確認のためのトークンを生成
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    //メール送信だーー！
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "確認メールを送信しました！" }
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // TODO: コードを確認する。
      const twoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );

      if (!twoFactorToken) {
        return { error: "無効なコードです" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "無効なコードです" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "コードの有効期限が切れました！" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });

      const existingConfirmation = await getTowFactorConfirmationByUserId(existingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id }
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      );

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAUT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "アカウントが見つかりませんでした" }
        default:
          return { error: "何か問題が発生しました！" }
      }
    }

    throw error;
  }
}