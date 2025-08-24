//  frontend/app/api/lords/route.ts
import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import LordModel from "@/models/Lord";
import UserModel from "@/models/User";

// GET-запрос для получения всех Лордов
export async function GET(req: NextRequest) {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const wallet = searchParams.get('wallet');

  try {
    if (wallet) {
      const user = await UserModel.findOne({ wallet });
      if (!user || !user.lordName) {
        return NextResponse.json({ error: "lord not found"}, { status: 404});
      }
      const lord = await LordModel.findOne({ name: user.lordName });
      return NextResponse.json(lord ? [lord] : [], { status: 200 });
    }

    const lords = await LordModel.find({});
    return NextResponse.json(lords, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении лордов:", error);
    return NextResponse.json({ error: "Ошибка при получении лордов" }, { status: 500 });
  }
}