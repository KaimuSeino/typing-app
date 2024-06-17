import { UserRole } from "@prisma/client";
import { z } from "zod"

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6, {
    message: "少なくとも6文字以上である必要があります"
  })),
  newPassword: z.optional(z.string().min(6, {
    message: "少なくとも6文字以上である必要があります"
  })),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "新しいパスワードが必要です！",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "パスワードが必要です！",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "最低６文字必要です"
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "無効なメールアドレスです"
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "無効なメールアドレスです"
  }),
  password: z.string().min(1, {
    message: "パスワードは必要です"
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "無効なメールアドレスです"
  }),
  password: z.string().min(6, {
    message: "最低６文字必要です"
  }),
  name: z.string().min(1, {
    message: "名前は必要です"
  })
})