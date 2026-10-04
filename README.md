# ScamLens

## Don't trust it. Scan it.

ScamLens is an AI-powered scam-awareness and verification assistant that analyzes suspicious screenshots and visual content using Gemma 4.

Instead of simply classifying content as "scam" or "not a scam", ScamLens identifies potential warning signals, explains the evidence behind the assessment, provides verification steps, and recommends practical safety actions.

---

## Architecture

```text
                         User
                           |
                           v
                  +----------------+
                  |   ScamLens UI   |
                  | HTML/CSS/JS     |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  | FastAPI Backend |
                  +-------+--------+
                          |
                          v
                  +----------------+
                  |    Gemma 4      |
                  | Multimodal AI   |
                  +-------+--------+
                          |
                          v
              +-------------------------+
              | Structured AI Analysis  |
              |                         |
              | Risk Score              |
              | Risk Level              |
              | Category                |
              | Evidence                |
              | Red Flags               |
              | Verification            |
              | Action Plan             |
              | Safety Advice            |
              +-----------+-------------+
                          |
                          v
                         User
```

### Processing Flow

1. The user uploads a suspicious screenshot.
2. ScamLens sends the image to the FastAPI backend.
3. The backend passes the image and analysis instructions to Gemma 4.
4. Gemma 4 evaluates potential scam warning signals.
5. The model returns structured analysis.
6. ScamLens presents the risk assessment, evidence, red flags, verification steps, and safety recommendations.

---

## Problem

Online scams increasingly appear as realistic messages, emails, job offers, payment requests, promotional offers, and account notifications.

The challenge is not only identifying whether something looks suspicious. Users also need to understand:

* What makes the content suspicious?
* What evidence supports the warning?
* What should they verify?
* What should they do immediately?
* Which information should they avoid sharing?

ScamLens addresses this problem by turning suspicious visual content into an explainable safety assessment.

---

## Solution

ScamLens allows users to upload screenshots of suspicious content and receive an AI-powered analysis.

The system can analyze content such as:

* SMS and messaging-app screenshots
* Emails
* Job offers
* Payment requests
* Prize and giveaway messages
* Account and security notifications
* Delivery messages
* Investment offers
* Impersonation attempts
* Social media messages and advertisements
* Suspicious links and payment requests

The system is designed as an awareness and verification assistant rather than an absolute scam detector.

---

## Features

### Risk Assessment

Generates a risk score from 0 to 100 and assigns a corresponding risk level.

Risk levels include:

* LOW
* MEDIUM
* HIGH
* VERY HIGH
* UNCERTAIN

### Scam Category Classification

Identifies the most relevant category, such as:

* Fake Reward / Giveaway
* Job Scam
* Payment Scam
* Phishing
* Account / Security Scam
* Impersonation Scam
* Delivery Scam
* Investment Scam
* Romance / Social Engineering
* Tech Support Scam
* Other
* No Clear Scam Pattern
* Unknown

### Risk Breakdown

Explains the individual warning signals detected in the content and assigns a severity level to each signal.

Examples include:

* Urgency or pressure
* Advance-payment requests
* Sensitive-information requests
* Suspicious contact information
* Unrealistic rewards
* Impersonation
* Suspicious links or domains
* Requests to bypass normal procedures
* Grammar or formatting inconsistencies
* Emotional manipulation

### Evidence Extraction

Shows concrete evidence identified in the uploaded content instead of providing only a generic prediction.

### Red Flag Explanation

Explains why specific parts of the message may be suspicious.

### Verification Steps

Provides practical methods for independently verifying the claim through trusted sources.

### Action Plan

Provides immediate safety recommendations based on the detected warning signals.

### Safety Advice

Provides general recommendations for avoiding financial loss, credential theft, and social engineering attacks.

### Responsible AI

The system avoids presenting its assessment as absolute truth.

The risk score represents the strength of observed warning signals and should not be interpreted as a guaranteed probability that content is fraudulent.

---

## Tech Stack

| Technology    | Purpose                                      |
| ------------- | -------------------------------------------- |
| Python        | Core application development                 |
| FastAPI       | Backend API and request handling             |
| Gemma 4       | Multimodal scam-content analysis             |
| Gemini API    | Access to the Gemma model                    |
| HTML          | Web interface structure                      |
| CSS           | User interface styling and responsive design |
| JavaScript    | Frontend interaction and API communication   |
| Jinja2        | Server-side HTML templating                  |
| Pillow        | Image handling                               |
| Uvicorn       | ASGI application server                      |
| python-dotenv | Environment variable management              |
| Git           | Version control                              |
| GitHub        | Source code hosting                          |

---

## Project Structure

```text
ScamLens/
|
+-- app/
|   +-- gemma.py
|   +-- main.py
|
+-- static/
|   +-- script.js
|   +-- style.css
|
+-- templates/
|   +-- index.html
|
+-- .env.example
+-- .gitignore
+-- requirements.txt
+-- README.md
```

---

## How It Works

ScamLens uses a multimodal AI pipeline.

```text
Image / Screenshot
        |
        v
    FastAPI
        |
        v
    Gemma 4
        |
        v
  AI Analysis
        |
        +------------------+
        |                  |
        v                  v
  Risk Assessment      Evidence
        |                  |
        +--------+---------+
                 |
                 v
       Verification Steps
                 |
                 v
          Action Plan
                 |
                 v
          User Interface
```

The model is instructed to analyze the visible evidence and identify potential warning signals rather than making unsupported claims.

---

## Example Analysis

A screenshot containing the following characteristics:

```text
Reward: ₹50,000
Required Fee: ₹499
Deadline: 24 hours
Suspicious Domain: amazongiftcard-official.com
```

can produce an assessment such as:

```text
Category: Fake Reward / Giveaway

Risk Score: 95 / 100

Risk Level: VERY HIGH
```

The system then explains the detected warning signals and provides verification and safety recommendations.

ScamLens can also analyze apparently legitimate content and return a lower-risk assessment when significant scam warning signals are not present.

---

## Installation

### Prerequisites

* Python 3.10 or later
* Git
* A Gemini API key with access to the required model

### Clone the Repository

```bash
git clone https://github.com/ankushsahaww-dev/ScamLens.git
cd ScamLens
```

### Create a Virtual Environment

Windows PowerShell:

```powershell
python -m venv venv
```

### Activate the Environment

```powershell
venv\Scripts\Activate.ps1
```

### Install Dependencies

```powershell
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file in the project root:

```text
GEMINI_API_KEY=your_api_key_here
```

Never commit your real API key to the repository.

### Run the Application

```powershell
uvicorn app.main:app --reload
```

Open the application at:

```text
http://127.0.0.1:8000
```

---

## Security

Sensitive configuration is intentionally excluded from version control.

The repository ignores:

```text
.env
venv/
__pycache__/
*.pyc
```

A `.env.example` file is provided so developers know which environment variables are required without exposing credentials.

---

## Responsible AI Notice

ScamLens is an AI-powered awareness and verification assistant.

It does not guarantee that content is fraudulent or legitimate.

AI-generated analysis may be incomplete or incorrect. Users should independently verify suspicious information through trusted official sources before taking action.

The risk score represents the strength of observed warning signals and is not a guaranteed probability of fraud.

ScamLens should not be used as the sole basis for financial, legal, security, or other high-impact decisions.

---

## Limitations

The current version primarily analyzes uploaded image-based content.

It does not currently provide:

* Direct email-file parsing
* Automatic URL reputation checking
* Real-time web verification
* Guaranteed scam detection
* Financial transaction monitoring
* Direct reporting to authorities or platforms

These capabilities may be considered for future versions.

---

## Future Improvements

Potential future improvements include:

1. Automated URL reputation and domain analysis
2. Direct email-file analysis
3. OCR enhancement
4. Multilingual scam detection
5. Browser extension integration
6. Mobile application
7. Real-time scam alerts
8. Trusted-source verification
9. Scam trend analytics
10. Additional multimodal input formats

---

## Hackathon Objective

ScamLens aims to make scam awareness more accessible by transforming suspicious content into an explainable risk assessment.

The goal is simple:

> Pause. Understand. Verify.

---

## License

This project is currently developed as a hackathon and educational project.
