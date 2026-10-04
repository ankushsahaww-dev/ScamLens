async function analyzeImage() {

    const input = document.getElementById("imageInput");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    if (!input.files.length) {
        alert("Please upload an image first.");
        return;
    }

    const file = input.files[0];

    const formData = new FormData();
    formData.append("file", file);

    loading.style.display = "block";
    result.innerHTML = "";

    try {

        const response = await fetch("/analyze", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        displayResult(data);

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <div class="card">
                <h2>⚠️ Something went wrong</h2>
                <p>
                    ScamLens could not analyze this image.
                    Please check the server and try again.
                </p>
            </div>
        `;

    } finally {

        loading.style.display = "none";

    }
}


function displayResult(data) {

    const result = document.getElementById("result");

    const risk = data.risk_level || "UNCERTAIN";
    const score = data.risk_score ?? "—";
    const category = data.category || "Unknown";

    let riskIcon = "⚪";

    if (risk === "VERY HIGH") {
        riskIcon = "🔴";
    } else if (risk === "HIGH") {
        riskIcon = "🔴";
    } else if (risk === "MEDIUM") {
        riskIcon = "🟠";
    } else if (risk === "LOW") {
        riskIcon = "🟢";
    }

    let html = `

        <div class="card risk-card">

            <div class="result-header">

                <div>
                    <p class="result-label">
                        SCAMLENS AI ANALYSIS
                    </p>

                    <h2>
                        ${category}
                    </h2>
                </div>

                <div class="risk-score">

                    <div class="score-number">
                        ${score}
                    </div>

                    <div class="score-label">
                        / 100
                    </div>

                </div>

            </div>

            <div class="risk ${risk.toLowerCase().replace(" ", "-")}">

                ${riskIcon}

                ${risk} RISK

            </div>

            <h3>AI Assessment</h3>

            <p class="summary">
                ${data.summary || "No summary available."}
            </p>

            <p class="responsible-score">
                The score represents the strength of observed warning
                signals, not a guaranteed probability of fraud.
            </p>

        </div>


        <div class="card">

            <h2>📊 Risk Breakdown</h2>

            <div class="risk-breakdown">

    `;


    if (data.risk_breakdown && data.risk_breakdown.length > 0) {

        data.risk_breakdown.forEach(item => {

            const severity = item.severity || "MEDIUM";

            html += `

                <div class="risk-item">

                    <div class="risk-item-top">

                        <strong>
                            ${item.signal}
                        </strong>

                        <span class="severity ${severity.toLowerCase()}">
                            ${severity}
                        </span>

                    </div>

                    <p>
                        ${item.reason}
                    </p>

                </div>

            `;

        });

    } else {

        html += `
            <p>No detailed risk breakdown was provided.</p>
        `;

    }


    html += `

            </div>

        </div>


        <div class="card">

            <h2>🔎 Evidence Found</h2>

            <ul class="evidence-list">

    `;


    if (data.evidence_found && data.evidence_found.length > 0) {

        data.evidence_found.forEach(evidence => {

            html += `
                <li>
                    <span class="evidence-icon">●</span>
                    ${evidence}
                </li>
            `;

        });

    } else {

        html += `
            <li>No specific evidence was identified.</li>
        `;

    }


    html += `

            </ul>

        </div>


        <div class="card">

            <h2>🚩 Red Flags</h2>

    `;


    if (data.red_flags && data.red_flags.length > 0) {

        data.red_flags.forEach(flag => {

            html += `

                <div class="flag">

                    <h3>
                        ⚠️ ${flag.title}
                    </h3>

                    <p>
                        <strong>Evidence:</strong>
                        ${flag.evidence}
                    </p>

                    <p>
                        ${flag.explanation}
                    </p>

                </div>

            `;

        });

    } else {

        html += `
            <p>No major warning signs were identified.</p>
        `;

    }


    html += `

        </div>


        <div class="card">

            <h2>🔍 What to Verify</h2>

            <ul class="checklist">

    `;


    if (data.verification_steps && data.verification_steps.length > 0) {

        data.verification_steps.forEach(step => {

            html += `
                <li>✓ ${step}</li>
            `;

        });

    }


    html += `

            </ul>

        </div>


        <div class="card action-card">

            <h2>🛡️ What Should You Do?</h2>

            <p class="section-description">
                Recommended immediate actions based on
                the detected warning signs.
            </p>

            <ol class="action-plan">

    `;


    if (data.action_plan && data.action_plan.length > 0) {

        data.action_plan.forEach(action => {

            html += `
                <li>${action}</li>
            `;

        });

    } else {

        html += `
            <li>
                Verify the information through an official source.
            </li>
        `;

    }


    html += `

            </ol>

        </div>


        <div class="card">

            <h2>🔐 Safety Advice</h2>

            <ul class="checklist">

    `;


    if (data.safety_advice && data.safety_advice.length > 0) {

        data.safety_advice.forEach(advice => {

            html += `
                <li>✓ ${advice}</li>
            `;

        });

    }


    html += `

            </ul>

        </div>

    `;


    result.innerHTML = html;

}


/* THEME TOGGLE */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button =
        document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {

        button.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        button.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

}


window.addEventListener("DOMContentLoaded", () => {

    const button =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        button.textContent = "☀️";

    }

});