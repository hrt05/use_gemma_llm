import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const reqestBody = await req
    const apiEndPoint = process.env.NEXT_PUBLIC_API_URL

    const apiFetch = await fetch(`${apiEndPoint}`, {
        method: "POST",
        body: `${reqestBody}`
    })
    if (apiFetch?.ok) {
        const data = apiFetch

        return NextResponse.json(data)
    }
}