import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/api/webhook/:path*",
};

const encoder = new TextEncoder();
const secretKey = encoder.encode(process.env.SECRET_KEY);

function byteStringToUint8Array(byteString: string) {
  const ui = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; ++i) {
    ui[i] = byteString.charCodeAt(i);
  }
  return ui;
}

export async function middleware(req: NextRequest) {
  const signatureBase64 = req.headers.get("x-test-signature");

  if (!signatureBase64) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const key = await crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const data = await req.text();

  const signature = byteStringToUint8Array(atob(signatureBase64));

  const verified = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    encoder.encode(data)
  );

  if (!verified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  return NextResponse.next();
}
