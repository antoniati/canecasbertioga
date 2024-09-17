import crypto from "crypto";

import { NextResponse } from "next/server";

const privateKey: string | undefined = process.env.PRIVATE_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token: string = searchParams.get("token") || crypto.randomUUID();
    const expire: string = searchParams.get("expire") || (Math.floor(Date.now() / 1000) + 2400).toString();
    const privateAPIKey: string = privateKey || "";
    const signature: string = crypto.createHmac("sha1", privateAPIKey).update(token + expire).digest("hex");

    return NextResponse.json({
        token,
        expire,
        signature,
    });
}