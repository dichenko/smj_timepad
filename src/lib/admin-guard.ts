import { NextResponse } from "next/server";
import { currentAdmin } from "./admin-auth";

export async function requireAdminApi() {
  const admin = await currentAdmin();
  return admin ?? NextResponse.json({ message: "Требуется вход администратора." }, { status: 401 });
}
