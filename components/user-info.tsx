import React from 'react';

type UserProgress = {
  userId: string;
  wordId: string;
  english: string;
  japanese: string;
  count: number;
}[];

interface UserInfoProps {
  userId: string;
  userProgress?: UserProgress;
}

export const UserInfo = ({ userId, userProgress }: UserInfoProps) => {
  return (
    <div className="w-[400px] h-screen border p-4 rounded-lg">
      <h2 className="p-2">学習状況</h2>
      <div className="flex justify-between pb-1">
        <div className="w-[100px]">English</div>
        <div>Japanese</div>
        <div>タイピング数</div>
      </div>
      <div className="flex flex-col w-full gap-y-2 max-h-[calc(100vh-100px)] overflow-auto">
        {userProgress?.map((wordInfo) => (
          <div key={wordInfo.wordId} className="flex justify-between border rounded-md p-2 mx-2">
            <div className="w-[100px]">{wordInfo.english}</div>
            <div>{wordInfo.japanese}</div>
            <div>{wordInfo.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
