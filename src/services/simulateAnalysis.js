function getRiskFromName(name) {
  const lower = name.toLowerCase()
  if (lower.includes("loan")) {
    return "high"
  }
  if (lower.includes("insurance")) {
    return "medium"
  }
  return "low"
}

function riskToScore(riskLevel) {
  if (riskLevel === "high") return 82
  if (riskLevel === "medium") return 56
  return 28
}

export function simulateAnalysis(fileName, language) {
  const lower = fileName.toLowerCase()
  const riskLevel = getRiskFromName(fileName)
  const riskScore = riskToScore(riskLevel)

  if (lower.includes("loan")) {
    if (language === "hi") {
      return {
        summary:
          "यह दस्तावेज़ एक लोन एग्रीमेंट जैसा दिखता है जिसमें ब्याज, दंड और चूक की शर्तें मुख्य हैं।",
        keyPoints: [
          "ब्याज दर परिवर्तनशील है और समय के साथ बढ़ सकती है।",
          "लेट पेमेंट पर अतिरिक्त शुल्क लागू है।",
          "डिफॉल्ट की स्थिति में संपत्ति जब्त होने का जोखिम है।",
        ],
        riskLevel,
        keyRisks: [
          {
            title: "उच्च दंड शुल्क",
            description: "लेट पेमेंट पर भारी पेनल्टी लग सकती है जिससे कुल देनदारी बढ़ेगी।",
          },
          {
            title: "सुरक्षा संपत्ति जोखिम",
            description: "डिफॉल्ट होने पर गिरवी संपत्ति पर दावा किया जा सकता है।",
          },
        ],
        whyItMatters:
          "गलत समझ के साथ साइन करने पर लंबी अवधि का वित्तीय दबाव और कानूनी विवाद हो सकता है।",
        actions: [
          "ब्याज और पेनल्टी क्लॉज को स्पष्ट रूप से लिखित में समझें।",
          "EMI मिस होने की स्थिति में वास्तविक लागत पूछें।",
          "अंतिम साइन से पहले विशेषज्ञ से समीक्षा करवाएं।",
        ],
        riskScore,
      }
    }

    return {
      summary:
        "This appears to be a loan agreement focused on repayment terms, penalties, and default obligations.",
      keyPoints: [
        "Interest terms are variable and may increase over time.",
        "Late payment penalties are explicitly included.",
        "Default clauses indicate potential collateral enforcement.",
      ],
      riskLevel,
      keyRisks: [
        {
          title: "High penalty exposure",
          description: "Missing repayment deadlines can significantly increase total payable amount.",
        },
        {
          title: "Collateral risk",
          description: "Default conditions may allow lender action against pledged assets.",
        },
      ],
      whyItMatters:
        "Signing without clarity can lead to long-term financial burden and legal pressure.",
      actions: [
        "Request a written explanation of penalty and interest adjustment clauses.",
        "Confirm worst-case repayment amount before signing.",
        "Get legal/financial review for high-value loans.",
      ],
      riskScore,
    }
  }

  if (lower.includes("insurance")) {
    if (language === "hi") {
      return {
        summary:
          "यह दस्तावेज़ बीमा पॉलिसी जैसा है जिसमें कवरेज, बहिष्करण और क्लेम प्रक्रिया की शर्तें हैं।",
        keyPoints: [
          "कई स्थितियों में पॉलिसी बहिष्करण लागू हो सकता है।",
          "क्लेम के लिए समय-सीमा और डॉक्यूमेंटेशन अनिवार्य है।",
          "कुछ लाभ प्रतीक्षा अवधि के बाद ही लागू होंगे।",
        ],
        riskLevel,
        keyRisks: [
          {
            title: "कवरेज गैप",
            description: "मुख्य मेडिकल स्थितियां बहिष्करण में आ सकती हैं।",
          },
          {
            title: "क्लेम अस्वीकृति जोखिम",
            description: "समय पर दस्तावेज़ न देने पर क्लेम रिजेक्ट हो सकता है।",
          },
        ],
        whyItMatters:
          "अगर कवरेज सीमाएं स्पष्ट नहीं हैं तो जरूरत के समय क्लेम रद्द होने का जोखिम बढ़ता है।",
        actions: [
          "बहिष्करण सूची को ध्यान से पढ़ें और लिखित स्पष्टता लें।",
          "क्लेम प्रक्रिया व समय-सीमा की चेकलिस्ट बनाएं।",
          "प्रतीक्षा अवधि और को-पे की शर्तें तुलना करें।",
        ],
        riskScore,
      }
    }

    return {
      summary:
        "This document looks like an insurance policy describing coverage scope, exclusions, and claims process.",
      keyPoints: [
        "Multiple exclusion clauses may limit claim eligibility.",
        "Claims require strict timelines and supporting documents.",
        "Some benefits activate only after waiting periods.",
      ],
      riskLevel,
      keyRisks: [
        {
          title: "Coverage gaps",
          description: "Important medical/incident scenarios may be excluded from payout.",
        },
        {
          title: "Claim rejection risk",
          description: "Missing process deadlines can result in claim denial.",
        },
      ],
      whyItMatters:
        "Lack of clarity on exclusions can create financial shock exactly when protection is needed.",
      actions: [
        "Request a plain-language exclusion summary from provider.",
        "Keep claim timeline and required documents ready in advance.",
        "Compare waiting period and co-pay terms with alternatives.",
      ],
      riskScore,
    }
  }

  if (language === "hi") {
    return {
      summary: "दस्तावेज़ में सामान्य शर्तें, जिम्मेदारियां और कानूनी भाषा शामिल है। साइन से पहले स्पष्ट समझ आवश्यक है।",
      keyPoints: [
        "महत्वपूर्ण क्लॉज पहचानकर सरल भाषा में समझें।",
        "जिम्मेदारियां और समय-सीमा स्पष्ट करें।",
        "अस्पष्ट बिंदुओं पर लिखित पुष्टि लें।",
      ],
      riskLevel,
      keyRisks: [
        {
          title: "अस्पष्ट क्लॉज",
          description: "कुछ कानूनी शर्तें व्यापक हैं और कई तरह से व्याख्यायित हो सकती हैं।",
        },
      ],
      whyItMatters: "गलत व्याख्या से अनपेक्षित दायित्व और विवाद की संभावना बढ़ सकती है।",
      actions: [
        "महत्वपूर्ण बिंदुओं का सार एक पेज में बनाएं।",
        "साइन से पहले सभी शुल्क/दायित्व सत्यापित करें।",
        "बड़े निर्णयों के लिए विशेषज्ञ सलाह लें।",
      ],
      riskScore,
    }
  }

  return {
    summary:
      "The document includes standard legal/compliance clauses and obligations that should be reviewed before signing.",
    keyPoints: [
      "Clarify key clauses in plain language.",
      "Validate obligations, fees, and timelines.",
      "Seek written confirmation for ambiguous sections.",
    ],
    riskLevel,
    keyRisks: [
      {
        title: "Ambiguous terms",
        description: "Some clauses are broad and can be interpreted in multiple ways.",
      },
    ],
    whyItMatters:
      "Misunderstanding obligations can create avoidable legal and financial exposure.",
    actions: [
      "Create a one-page summary of critical terms.",
      "Verify all hidden fees and liabilities before signing.",
      "Consult a professional for high-stakes agreements.",
    ],
    riskScore,
  }
}
