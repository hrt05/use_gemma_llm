'use client'

import { useState } from "react"
import styles from "./styles.module.css"

const TopPageComponent = () => {
    const [prompt, setPrompt] = useState("")
    const [gemmaContent, setGemmaContent] = useState<string>("")
    const [promptEcho, setPromptEcho] = useState<string>("")

    // ★追加: マークダウンをパースしてJSXに変換する関数
    const parseMarkdown = (text: string) => {
    const lines = text.split("\n")
    const elements: React.ReactNode[] = []
    const listItems: React.ReactNode[] = []

    const flushList = () => {
        if (listItems.length > 0) {
        elements.push(<ul key={`ul-${elements.length}`}>{[...listItems]}</ul>)
        listItems.length = 0
        }
    }

    lines.forEach((line, i) => {
        // 箇条書き行 (*   **ラベル:** テキスト)
        if (line.startsWith("*   ") || line.startsWith("* ")) {
        const content = line.replace(/^\*+\s+/, "")
        const parts = content.split(/(\*\*.*?\*\*)/)
        const rendered = parts.map((p, j) =>
            p.startsWith("**") ? <strong key={j}>{p.replace(/\*\*/g, "")}</strong> : p
        )
        listItems.push(<li key={i}>{rendered}</li>)
        } else {
        flushList()
        if (line.trim()) {
            elements.push(<p key={i}>{line}</p>)
        }
        }
    })

    flushList()
    return elements
    }

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
            setPromptEcho(prompt)
            setGemmaContent(apiFetchBody)
        }
    }

    const supplementMatch = gemmaContent.match(/(補足：.+)$/)
    const mainContent = gemmaContent.replace(/(補足：.+)$/, "").trim()
    const supplement = supplementMatch?.[1] ?? ""

    return(
        <div>
            <h1 className={styles.pageTitle}>
                これはトップページです
            </h1>
            <p className={styles.pageDesc}>ここにプロンプトを入力してください</p>
            <input className={styles.promptInput} placeholder="プロンプト入力" value={prompt} type="text" onChange={(e) => setPrompt(e.target.value)}></input>
            <button className={styles.submitBtn} onClick={handleSubmit}>送信！</button>

            {gemmaContent && (
                <div className={styles.responseCard}>
                <p className={styles.promptEcho}>{promptEcho}</p>
                <div className={styles.responseBody}>
                    {parseMarkdown(mainContent)}
                </div>
                {supplement && (
                    <p className={styles.supplement}>{supplement}</p>
                )}
                </div>
            )}
        </div>
    )
}

export default TopPageComponent