"use server";

import * as z from "zod";

import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (
  values: z.infer<typeof SettingsSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "不正アクセスです" }
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "不正アクセスです" }
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "このメールはすでに使用されています！" }
    }

    const verifivationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verifivationToken.email,
      verifivationToken.token,
    );

    return { success: "確認メールが送信されました！" }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: "パスワードが間違っています！" };
    }

    const hashedPassword = await bcrypt.hash(
      values.newPassword,
      10
    );
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values
    }
  });

  return { success: "設定を更新しました！" }
}