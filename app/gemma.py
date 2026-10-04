import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL = "gemma-4-26b-a4b-it"


def analyze_scam(image_bytes, mime_type):

    prompt = """
You are ScamLens, an AI-powered scam-awareness and verification assistant.

Analyze the uploaded image for potential scam warning signs.

The image may contain:
- SMS messages
- emails
- job advertisements
- payment requests
- social media messages
- promotional offers
- account/security warnings
- QR/payment requests
- delivery messages
- investment offers

IMPORTANT RESPONSIBLE-AI RULES:
- Do NOT claim with certainty that something is a scam.
- Do NOT claim that something is definitely legitimate.
- Base the assessment only on evidence visible in the image.
- The risk score represents the strength and number of warning signals,
  NOT a guaranteed probability that the content is fraudulent.
- If the image is unclear or insufficient, use UNCERTAIN.

Analyze the following warning signals:

1. Urgency or pressure
2. Payment or advance-fee requests
3. Requests for passwords, OTPs, banking details or sensitive information
4. Suspicious contact information
5. Unrealistic rewards or promises
6. Impersonation of a company, government organization or person
7. Suspicious links or domains
8. Requests to bypass normal procedures
9. Grammar or formatting inconsistencies
10. Emotional manipulation or threats

Also determine the most likely scam category.

Possible categories:
- Fake Reward / Giveaway
- Job Scam
- Payment Scam
- Phishing
- Account / Security Scam
- Impersonation Scam
- Delivery Scam
- Investment Scam
- Romance / Social Engineering
- Tech Support Scam
- Other
- No Clear Scam Pattern
- Unknown

Calculate a risk score from 0 to 100.

Use this general guidance:

0-25 = LOW
26-50 = MEDIUM
51-75 = HIGH
76-100 = VERY HIGH

However, do not force a high score if there is insufficient evidence.

Return ONLY valid JSON.

Use EXACTLY this structure:

{
  "category": "Fake Reward / Giveaway",
  "risk_score": 92,
  "risk_level": "VERY HIGH",
  "summary": "Short evidence-based explanation of the assessment.",

  "risk_breakdown": [
    {
      "signal": "Urgency",
      "severity": "HIGH",
      "reason": "The message creates pressure by requiring action within 24 hours."
    },
    {
      "signal": "Payment Request",
      "severity": "HIGH",
      "reason": "The user is asked to pay an upfront fee."
    }
  ],

  "red_flags": [
    {
      "title": "Urgency",
      "evidence": "Exact or paraphrased evidence visible in the image",
      "explanation": "Why this may be suspicious"
    }
  ],

  "evidence_found": [
    "Suspicious URL or domain",
    "Upfront payment request",
    "Unrealistic reward"
  ],

  "verification_steps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],

  "action_plan": [
    "Immediate safety action 1",
    "Immediate safety action 2",
    "Immediate safety action 3"
  ],

  "safety_advice": [
    "General safety advice 1",
    "General safety advice 2"
  ]
}

Rules for fields:

category:
Choose the most appropriate category from the list above.

risk_score:
Integer from 0 to 100.

risk_level:
Must be exactly one of:
LOW
MEDIUM
HIGH
VERY HIGH
UNCERTAIN

risk_breakdown:
Include the most important warning signals found.
Use severity:
LOW
MEDIUM
HIGH

red_flags:
Include 2-6 important warning signs when evidence exists.

evidence_found:
List concrete evidence visible in the image.
Do not invent evidence.

verification_steps:
Give practical ways the user can independently verify the claim.

action_plan:
Give immediate actions the user should take to stay safe.

safety_advice:
Give general safety recommendations.

If the image does not contain suspicious content, explain that clearly and do not invent warning signs.
"""

    response = client.models.generate_content(
        model=MODEL,
        contents=[
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": mime_type,
                            "data": image_bytes
                        }
                    }
                ]
            }
        ]
    )

    result = response.text

    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    return json.loads(result)