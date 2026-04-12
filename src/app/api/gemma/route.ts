import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const reqestBody = await req.json()
    const parseReqestBody = typeof reqestBody === "string" ? reqestBody : (reqestBody?.prompt ?? reqestBody?.content ?? "")
    const apiEndPoint = process.env.NEXT_PUBLIC_API_URL

    const sendBody = {
        model: "gemma-7b-it-Q4_K_M.gguf",
        // messages: [{"role":"system","content":"あなたは日本語で答えるアシスタントです。・事実が不確かなときは推測と明記する。・不要な前置きや自己紹介はしない。・質問に直接答え、必要なら最後に短く補足する。・<|...|> のような特殊な区切り記号や、見出し用の記号だけの行は出力しない。・ユーザーが求めていない「正解」「採点」「修正案の比較」などの形式で答えない。"}, {"role": "user", "content": parseReqestBody}]
        messages: [{"role":"system","content":"あなたは日本語で答えるアシスタントです。・事実が不確かなときは推測と明記する。・不要な前置きや自己紹介はしない。・質問に直接答え、必要なら最後に短く補足する。・<|...|> のような特殊な区切り記号や、見出し用の記号だけの行は出力しない。・ユーザーが求めていない「正解」「採点」「修正案の比較」などの形式で答えない。"}, {"role": "user", "content": parseReqestBody}]
    }

    const apiFetch = await fetch(`${apiEndPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(reqestBody)
        body: JSON.stringify(sendBody)
    })

    console.log(reqestBody)
    if (apiFetch?.ok) {
        const data = await apiFetch.json()

        console.log(data.choices[0].message.content)
        return NextResponse.json(data.choices[0].message.content)
    } else {
        return NextResponse.json("どこかでエラーが起きてます。")
    }
}