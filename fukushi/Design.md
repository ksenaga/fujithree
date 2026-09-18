# Design Guidelines

## 1. Design Concept

本サイトは、**柔らかく、温かみがあり、親しみやすいデザイン**を基本とする。

丸みのある `Zen Maru Gothic` と、淡い暖色系のアクセントカラーを使用することで、堅すぎず優しい印象を与える。

---

## 2. Colors

### Base Color

| 用途     | カラー                  |
| ------ | -------------------- |
| ベースカラー | `rgb(255, 255, 255)` |
| メイン文字色 | `rgb(63, 63, 63)`    |

### Accent Colors

| 用途        | カラー       | 印象                 |
| --------- | --------- | ------------------ |
| アクセントカラー① | `#F5D590` | 淡いイエロー・優しい・明るい     |
| アクセントカラー② | `#E8A07C` | くすみコーラル・温かい・親しみやすい |

### Color Usage

* `#F5D590`

  * セクションの背景
  * 装飾
  * アイコンの背景
  * 強調表示
  * 柔らかい印象を与えたい箇所

* `#E8A07C`

  * ボタン
  * CTA
  * リンク
  * 重要なポイント
  * アクティブ状態
  * より強く目立たせたい箇所

* `rgb(63, 63, 63)`

  * 本文
  * 見出し
  * ナビゲーション
  * 基本的なテキスト

* `rgb(255, 255, 255)`

  * ページ背景
  * カード背景
  * コンテンツエリア

---

## 3. Typography

### Body

本文には `Noto Sans JP` を使用する。

```css
font-family: "Noto Sans JP", sans-serif;
color: rgb(63, 63, 63);
font-size: 18px;
```

### Headings

見出しには `Zen Maru Gothic` を使用する。

```css
font-family: "Zen Maru Gothic", sans-serif;
color: rgb(63, 63, 63);
```

### H1

```css
font-family: "Zen Maru Gothic", sans-serif;
color: rgb(63, 63, 63);
font-size: 38px;
```

### Typography Rules

* 本文は読みやすさを優先する
* 見出しは `Zen Maru Gothic` により、本文との差別化を行う
* 基本の文字色は `rgb(63, 63, 63)` とする
* 過度な太字や装飾は避け、余白とサイズによって情報の優先度を表現する

---

## 4. Design Principles

### Soft

角の強いデザインや極端なコントラストを避け、柔らかい印象を維持する。

### Warm

`#F5D590` と `#E8A07C` の暖色系カラーを使用し、温かみのある雰囲気を作る。

### Simple

色や装飾を増やしすぎず、基本カラーとアクセントカラーを中心に構成する。

### Readable

デザイン性よりも文章の読みやすさを優先する。

---

## 5. Color Hierarchy

基本的な色の優先順位は以下とする。

1. `rgb(255, 255, 255)` — ベース
2. `rgb(63, 63, 63)` — メインテキスト
3. `#F5D590` — メインアクセント
4. `#E8A07C` — サブアクセント・強調

アクセントカラーは多用せず、ユーザーの視線を誘導したい箇所に限定して使用する。

---

## 6. CSS Example

```css
:root {
    --color-base: rgb(255, 255, 255);
    --color-text: rgb(63, 63, 63);

    --color-accent: #f5d590;
    --color-accent-secondary: #e8a07c;
}

body {
    font-family: "Noto Sans JP", sans-serif;
    color: var(--color-text);
    background-color: var(--color-base);
    font-size: 18px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Zen Maru Gothic", sans-serif;
    color: var(--color-text);
}

h1 {
    font-size: 38px;
}
```

---

## 7. Future Design Rules

今後、カラーやフォントを追加する場合も、以下の方針を維持する。

* 暖色系を基本とする
* 彩度が高すぎる色は避ける
* 本文の可読性を損なわない
* アクセントカラーを増やしすぎない
* `Zen Maru Gothic` の柔らかい雰囲気と調和する色を選択する
