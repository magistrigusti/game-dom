// frontend/app/api/create-lord/route.ts

import { dbConnect } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import LordModel from "@/models/Lord";

// POST-запрос для создания Лорда
export async function POST(req: NextRequest) {
  await dbConnect();

  const { name, role } = await req.json();

  // Проверяем уникальность имени
  const existing = await LordModel.findOne({ name });
  if (existing) {
    return NextResponse.json({ error: "Лорд с таким именем уже есть!" }, { status: 400 });
  }

  // Создаём нового Лорда
  const lord = await LordModel.create({ name, role });
  return NextResponse.json(lord, { status: 201 });
}
