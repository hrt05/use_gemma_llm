### 自宅LLM(gemma-4-E4B-it-Q4_K_M.gguf)を動かして表示する部分まで作成しました。
> CSS部分はmodule.cssを使用しClaudeにAIからのレスポンスを正規化しスタイリングを当ててもらいました。

## 実行画面
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/1f5eb1e7-a1dc-4fda-9327-a9820830bb7f" />

## 技術スタックとか
実行環境 → Linux Ubuntu (i3 8100, gtx1050ti, hdd 500GB, ddr4 16GB)<br />
エンジン → llama.cpp<br />
API → llama-server<br />
frontend → Next.js, React<br />
backend → Next.js, TypeScript

## 環境変数 (例
NEXT_PUBLIC_API_URL=http://192.168.0.0:8000/v1/chat/completions
