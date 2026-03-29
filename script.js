const summarizeBtn = document.getElementById('summarizeBtn');
const loadingBtn = document.getElementById('loadingBtn');
const inputText = document.getElementById('inputText');
const resultBox = document.getElementById('result');

async function summarizeArticle() {
  const text = inputText.value.trim();
  if (!text) {
    alert("Please enter text to summarize.");
    return;
  }

  // Show loading
  summarizeBtn.classList.add('hidden');
  loadingBtn.classList.remove('hidden');
  resultBox.classList.remove('show');
  resultBox.textContent = "";

  try {
    // Simulate API call (replace this with actual API request)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Dummy summarized text
    const summary = text.split('.').slice(0, 2).join('.') + '.';

    resultBox.textContent = summary;
    resultBox.classList.add('show');
  } catch (err) {
    alert("Error summarizing text: " + err.message);
  } finally {
    // Hide loading
    loadingBtn.classList.add('hidden');
    summarizeBtn.classList.remove('hidden');
  }
}

summarizeBtn.addEventListener('click', summarizeArticle);

// Optional: Allow Enter + Shift to submit when inside textarea on mobile
inputText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    summarizeArticle();
  }
});
