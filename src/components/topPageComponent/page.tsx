'use client'

import { useState } from "react"

const TopPageComponent = () => {
    const [prompt, setPrompt] = useState("")

    const handleSubmit = () => {
        console.log("押下テスト")
    }

    return(
        <div>
            <h1>
                これはトップページです
            </h1>
            <p>ここにプロンプトを入力してください</p>
            <input placeholder="プロンプト入力" value={prompt} type="text" onChange={(e) => setPrompt(e.target.value)}></input>
            <button onClick={handleSubmit}>送信！</button>
        </div>
    )
}

export default TopPageComponent