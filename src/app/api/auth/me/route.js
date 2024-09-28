import { NextResponse } from "next/server";

export async function GET(req) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await fetch(`http://localhost:5000/api/v3/user/me`, {
      credentials: "include", // Make sure credentials are included
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
