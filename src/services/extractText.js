import * as pdfjsLib from "pdfjs-dist"
import { createWorker } from "tesseract.js"

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString()

const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

async function extractTextFromPdf(file) {
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise
  const textPages = []

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()
    const text = textContent.items.map((item) => item.str).join(" ")
    textPages.push(text)
  }

  return textPages.join("\n")
}

async function extractTextFromImage(file) {
  const worker = await createWorker("eng")
  const result = await worker.recognize(file)
  await worker.terminate()
  return result.data.text || ""
}

export async function extractDocumentText(file) {
  if (!file) {
    throw new Error("No document selected.")
  }

  if (file.type === "application/pdf") {
    return extractTextFromPdf(file)
  }

  if (SUPPORTED_IMAGE_TYPES.includes(file.type)) {
    return extractTextFromImage(file)
  }

  throw new Error("Unsupported file type. Please upload PDF or image.")
}
