# BharatDoc AI

Mobile-first React + Tailwind web app for medical document uploads and AI risk summaries.

## Features

- Upload PDF or image documents
- Capture document with phone camera
- OCR + PDF text extraction
- AI analysis output with:
  - simple explanation
  - risk alert (red/green)
- English / Hindi language toggle
- Startup-style mobile UI (`max-width: 420px`)

## Tech stack

- React + Vite
- Tailwind CSS
- `pdfjs-dist` for PDF text extraction
- `tesseract.js` for image OCR
- Gemini API (with fallback heuristic mode if API key is missing)

## Run locally

```bash
npm install
npm run dev
```

## AI setup

1. Copy `.env.example` to `.env`
2. Set your Gemini key:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-1.5-flash
```

Without API key, the app still works using fallback local heuristic analysis.
