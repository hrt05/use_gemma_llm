'use client'

import { useState } from "react"

const TopPageComponent = () => {
    const [prompt, setPrompt] = useState("")
    const [gemmaContent, setGemmaContent] = useState([])

    const handleSubmit = async () => {
        console.log("押下テスト")
        const apiFetch = await fetch("/api/gemma", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prompt),
        })
        if (apiFetch?.ok) {
            console.log("apiは送信できているかも")
            // const data = apiFetch
            // console.log(apiFetch.json())
            const apiFetchBody = await apiFetch.json()
            setGemmaContent(apiFetchBody)
        }
    }

    return(
        <div>
            <h1>
                これはトップページです
            </h1>
            <p>ここにプロンプトを入力してください</p>
            <input placeholder="プロンプト入力" value={prompt} type="text" onChange={(e) => setPrompt(e.target.value)}></input>
            <button onClick={handleSubmit}>送信！</button>

            <div>
                <p>{gemmaContent}</p>
            </div>
        </div>
    )
}

export default TopPageComponent