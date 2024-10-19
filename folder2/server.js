const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;
const DEEPL_API_KEY = 'a6990b66-fca1-4a03-81cd-f9ada364d12b:fx'; // ここにAPIキーを入力

app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        auth_key: DEEPL_API_KEY,
        text: text,
        target_lang: targetLang,
      }),
    });

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    res.json({ translatedText: data.translations[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
