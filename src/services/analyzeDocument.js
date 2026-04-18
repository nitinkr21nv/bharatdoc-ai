const DEFAULT_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-1.5-flash"

function heuristicRisk(text) {
  const highRiskRegex =
    /(malignant|metastasis|hemorrhage|fracture|severe|critical|urgent|tumor|cancer|stroke)/i
  return highRiskRegex.test(text) ? "high" : "low"
}

function heuristicSummary(text, language) {
  const shortText = text.trim().slice(0, 220)
  if (language === "hi") {
    return `दस्तावेज़ से मुख्य जानकारी: ${shortText || "पाठ स्पष्ट नहीं मिला।"}`
  }
  return `Key details found in the document: ${shortText || "No clear text was extracted."}`
}

function buildFallback(text, language) {
  const riskType = heuristicRisk(text)
  const basePoints =
    language === "hi"
      ? [
          "दस्तावेज़ का पाठ सफलतापूर्वक निकाला गया।",
          "प्रमुख मेडिकल शब्दों के आधार पर प्रारंभिक जोखिम जाँचा गया।",
          "अंतिम निर्णय के लिए डॉक्टर से परामर्श आवश्यक है।",
        ]
      : [
          "Document text was extracted successfully.",
          "Preliminary risk was estimated from key medical terms.",
          "Doctor confirmation is required for final decisions.",
        ]

  if (language === "hi") {
    return {
      explanation: heuristicSummary(text, "hi"),
      keyPoints: basePoints,
      riskType,
      riskMessage:
        riskType === "high"
          ? "गंभीर संकेत दिख रहे हैं। कृपया जल्द डॉक्टर से सलाह लें।"
          : "कोई तुरंत गंभीर संकेत नहीं दिखे, फिर भी डॉक्टर से पुष्टि करें।",
    }
  }

  return {
    explanation: heuristicSummary(text, "en"),
    keyPoints: basePoints,
    riskType,
    riskMessage:
      riskType === "high"
        ? "Potentially serious findings detected. Please consult a doctor soon."
        : "No immediate severe red flags detected, but confirm with a doctor.",
  }
}

function safeJsonParse(text) {
  const cleaned = text.replace(/```json|```/g, "").trim()
  return JSON.parse(cleaned)
}

function ensureKeyPoints(points, language) {
  if (Array.isArray(points) && points.length > 0) {
    return points.slice(0, 3)
  }
  return language === "hi"
    ? ["मुख्य निष्कर्ष उपलब्ध नहीं।", "जोखिम संकेतों की समीक्षा की गई।", "डॉक्टर से सलाह लें।"]
    : ["Key findings unavailable.", "Risk indicators were reviewed.", "Consult a doctor to confirm."]
}

async function analyzeWithGemini(text, language, apiKey) {
  const prompt = `
You are a medical document assistant.
Read the text and return strict JSON only with keys:
- explanation (simple 2-3 line explanation in ${language === "hi" ? "Hindi" : "English"})
- keyPoints (array of exactly 3 short bullet points in ${language === "hi" ? "Hindi" : "English"})
- riskType ("high" or "low")
- riskMessage (1-2 lines in ${language === "hi" ? "Hindi" : "English"})

Document text:
${text.slice(0, 12000)}
`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${DEFAULT_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 400 },
      }),
    },
  )

  if (!response.ok) {
    throw new Error("AI request failed")
  }

  const data = await response.json()
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) {
    throw new Error("AI returned empty response")
  }

  const parsed = safeJsonParse(rawText)
  return {
    explanation: parsed.explanation,
    keyPoints: ensureKeyPoints(parsed.keyPoints, language),
    riskType: parsed.riskType === "high" ? "high" : "low",
    riskMessage: parsed.riskMessage,
  }
}

export async function analyzeDocumentText(text, language) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!text?.trim()) {
    throw new Error(language === "hi" ? "दस्तावेज़ से कोई पाठ नहीं निकला।" : "No readable text extracted.")
  }

  if (!apiKey) {
    return buildFallback(text, language)
  }

  try {
    return await analyzeWithGemini(text, language, apiKey)
  } catch {
    return buildFallback(text, language)
  }
}
