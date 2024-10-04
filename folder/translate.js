document.getElementById('translateButton').addEventListener('click', async () => {
    // iFrameのコンテンツを取得
    const iframe = document.getElementById('contentFrame');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const textElement = iframeDocument.getElementById('textToTranslate');
    
    if (textElement) {
        const textToTranslate = textElement.textContent;

        // DeepL APIを使用してテキストを翻訳
        const apiKey = '7243e3c0-121d-42d3-9383-a3ba2fcd3934:fx';
        const url = 'api-free.deepl.com';
        const params = new URLSearchParams({
            auth_key: apiKey,
            text: textToTranslate,
            target_lang: 'EN'  // 翻訳先の言語を指定 (例: 英語)
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: params
            });

            const result = await response.json();
            const translatedText = result.translations[0].text;

            // 翻訳結果をiFrame内に表示
            textElement.textContent = translatedText;
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    } else {
        console.error('翻訳対象のテキストが見つかりません。');
    }
});


