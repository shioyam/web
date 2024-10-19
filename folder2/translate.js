document.getElementById('translateButton').addEventListener('click', async () => {
  const targetLang = document.getElementById('language').value;

  const elementsToTranslate = [
    { id: 'title', text: document.getElementById('title').innerText },
    { id: 'content', text: document.getElementById('content').innerText },
  ];

  for (const element of elementsToTranslate) {
    const translatedText = await translateText(element.text, targetLang);
    document.getElementById(element.id).innerText = translatedText;
  }
});

async function translateText(text, targetLang) {
  const response = await fetch('http://localhost:3000/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, targetLang }),
  });

  if (!response.ok) throw new Error('Translation failed');
  const data = await response.json();
  return data.translatedText;
}
