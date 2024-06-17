import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const words = [
  { english: "achievement", japanese: "達成" },
  { english: "advertisement", japanese: "広告" },
  { english: "appointment", japanese: "予約" },
  { english: "candidate", japanese: "候補者" },
  { english: "conference", japanese: "会議" },
  { english: "customer", japanese: "顧客" },
  { english: "delivery", japanese: "配達" },
  { english: "department", japanese: "部門" },
  { english: "development", japanese: "発展" },
  { english: "equipment", japanese: "装備" },
  { english: "experience", japanese: "経験" },
  { english: "interview", japanese: "面接" },
  { english: "manager", japanese: "管理者" },
  { english: "marketing", japanese: "マーケティング" },
  { english: "performance", japanese: "業績" },
  { english: "presentation", japanese: "プレゼンテーション" },
  { english: "project", japanese: "プロジェクト" },
  { english: "promotion", japanese: "昇進" },
  { english: "recruitment", japanese: "採用" },
  { english: "salary", japanese: "給料" },
  { english: "budget", japanese: "予算" },
  { english: "contract", japanese: "契約" },
  { english: "deadline", japanese: "締め切り" },
  { english: "discount", japanese: "割引" },
  { english: "estimate", japanese: "見積もり" },
  { english: "inventory", japanese: "在庫" },
  { english: "invoice", japanese: "請求書" },
  { english: "meeting", japanese: "会議" },
  { english: "order", japanese: "注文" },
  { english: "policy", japanese: "方針" },
  { english: "profit", japanese: "利益" },
  { english: "proposal", japanese: "提案" },
  { english: "purchase", japanese: "購入" },
  { english: "receipt", japanese: "領収書" },
  { english: "report", japanese: "報告書" },
  { english: "schedule", japanese: "予定" },
  { english: "shipment", japanese: "発送" },
  { english: "strategy", japanese: "戦略" },
  { english: "supplier", japanese: "供給業者" },
  { english: "survey", japanese: "調査" },
  { english: "task", japanese: "任務" },
  { english: "training", japanese: "訓練" },
  { english: "transportation", japanese: "輸送" },
  { english: "analysis", japanese: "分析" },
  { english: "application", japanese: "申請" },
  { english: "benefit", japanese: "利益" },
  { english: "career", japanese: "経歴" },
  { english: "communication", japanese: "通信" },
  { english: "competitor", japanese: "競争相手" },
  { english: "consultant", japanese: "コンサルタント" },
  { english: "contractor", japanese: "契約者" },
  { english: "contribution", japanese: "貢献" },
  { english: "cooperation", japanese: "協力" },
  { english: "distribution", japanese: "配布" },
  { english: "employer", japanese: "雇用者" },
  { english: "entrepreneur", japanese: "起業家" },
  { english: "executive", japanese: "重役" },
  { english: "feedback", japanese: "フィードバック" },
  { english: "guideline", japanese: "ガイドライン" },
  { english: "implementation", japanese: "実行" },
  { english: "initiative", japanese: "主導権" },
  { english: "innovation", japanese: "革新" },
  { english: "investment", japanese: "投資" },
  { english: "partnership", japanese: "協力" },
  { english: "productivity", japanese: "生産性" },
  { english: "quality", japanese: "品質" },
  { english: "revenue", japanese: "収益" },
  { english: "stakeholder", japanese: "利害関係者" },
  { english: "supervisor", japanese: "監督者" },
  { english: "sustainability", japanese: "持続可能性" },
  { english: "venture", japanese: "冒険" },
];

async function main() {
  for (const word of words) {
    await db.word.create({
      data: {
        english: word.english,
        japanese: word.japanese,
        mp3Path: `/sounds/${word.english}.mp3`,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
