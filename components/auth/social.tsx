"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { DEFAUT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAUT_LOGIN_REDIRECT
    })
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline" // variantはプログラムの実行条件を設定した値に管理するオブジェクト
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
        <span className="text-sm text-slate-500 ml-2">Googleで続ける</span>
      </Button>
      {/* <Button
        size="lg"
        className="w-full"
        variant="outline" // variantはプログラムの実行条件を設定した値に管理するオブジェクト
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
        <span className="text-sm text-slate-500 ml-2">Githubで続ける</span>
      </Button> */}
    </div>
  )
}