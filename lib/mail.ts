import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2要素認証コード",
    html: `<p>あなたの２要素認証コード: ${token}</p>`,
  });
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "パスワードをリセットしてください",
    html: `<p>Click <a href="${resetLink}">here</a> to comfirm email.</p>`
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "メールアドレスを確認してください",
    html: `<p>Click <a href="${confirmLink}">here</a> to comfirm email.</p>`
  });
}