// script.js

// DOM elements
const summarizeBtn = document.getElementById("summarizeBtn");
const textarea = document.getElementById("inputText");
const resultDiv = document.getElementById("result");

// Function to summarize text using Gemini API
async function summarizeText() {
  const text = textarea.value.trim();
  if (!text) {
    alert("Please enter text to summarize!");
    return;
  }

  // Disable button and show loading
  summarizeBtn.disabled = true;
  summarizeBtn.textContent = "Summarizing...";

  // Clear previous result
  resultDiv.textContent = "";
  resultDiv.classList.remove("show");

  try {
    // Make request to your backend server (server.js)
    const response = await fetch("/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    // Split summary into sentences for fade-in effect
    const summary = data.summary || "No summary returned.";
    const sentences = summary.split(". ");

    sentences.forEach((sentence, i) => {
      setTimeout(() => {
        resultDiv.textContent += sentence + (i < sentences.length - 1 ? ". " : "");
        resultDiv.classList.add("show");
        // Auto-scroll to bottom if content overflows
        resultDiv.scrollTop = resultDiv.scrollHeight;
      }, i * 150); // 150ms delay per sentence
    });

  } catch (error) {
    console.error(error);
    resultDiv.textContent = "Error summarizing text. Please try again.";
    resultDiv.classList.add("show");
  } finally {
    summarizeBtn.disabled = false;
    summarizeBtn.textContent = "Summarize";
  }
}

// Event listener
summarizeBtn.addEventListener("click", summarizeText);

// Optional: Allow pressing "Enter + Ctrl" to summarize
textarea.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    summarizeText();
  }
});