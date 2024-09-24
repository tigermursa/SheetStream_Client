
import { NextResponse } from "next/server";
import { validatePassword } from "@/utils/validatePassword";

export async function POST(request) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (validatePassword(password)) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("password-authenticated", "true", { httpOnly: true, path: '/' });
    return response;
  } else {
    return NextResponse.json({ success: false });
  }
}
