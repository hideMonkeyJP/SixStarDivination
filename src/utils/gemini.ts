import { GoogleGenerativeAI } from '@google/generative-ai';

// Check if API key exists
const apiKey = import.meta.env.PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('Gemini API key is not set. Please set PUBLIC_GEMINI_API_KEY environment variable.');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function getDetailedAdvice(
  fortuneStar: string,
  sign: '陽' | '陰',
  currentCycle: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      あなたは六星占術の専門家として、以下の情報に基づいて具体的なアドバイスを提供してください。
      
      対象者の情報:
      - 運命星: ${fortuneStar}人
      - 陽陰: ${sign}
      - 現在の運気周期: ${currentCycle}

      以下の形式でアドバイスを提供してください。各項目は具体的で実践的な内容を3つずつ含めてください。
      回答は以下のHTML形式で出力してください:

      <div class="advice-content">
        <div class="advice-section">
          <h4><span class="section-icon">⚠️</span>現在の時期における注意点</h4>
          <ul>
            <li>注意点1（具体的な行動指針）</li>
            <li>注意点2（具体的な行動指針）</li>
            <li>注意点3（具体的な行動指針）</li>
          </ul>
        </div>

        <div class="advice-section">
          <h4><span class="section-icon">💼</span>キャリアと仕事</h4>
          <ul>
            <li>アドバイス1（具体的な行動指針）</li>
            <li>アドバイス2（具体的な行動指針）</li>
            <li>アドバイス3（具体的な行動指針）</li>
          </ul>
        </div>

        <div class="advice-section">
          <h4><span class="section-icon">🤝</span>人間関係</h4>
          <ul>
            <li>アドバイス1（具体的な行動指針）</li>
            <li>アドバイス2（具体的な行動指針）</li>
            <li>アドバイス3（具体的な行動指針）</li>
          </ul>
        </div>

        <div class="advice-section">
          <h4><span class="section-icon">🏥</span>健康管理</h4>
          <ul>
            <li>アドバイス1（具体的な行動指針）</li>
            <li>アドバイス2（具体的な行動指針）</li>
            <li>アドバイス3（具体的な行動指針）</li>
          </ul>
        </div>

        <div class="advice-section">
          <h4><span class="section-icon">💰</span>金運</h4>
          <ul>
            <li>アドバイス1（具体的な行動指針）</li>
            <li>アドバイス2（具体的な行動指針）</li>
            <li>アドバイス3（具体的な行動指針）</li>
          </ul>
        </div>
      </div>
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `
      <div class="error-message">
        <span class="error-icon">⚠️</span>
        <p>申し訳ありません。現在アドバイスを取得できません。<br>しばらく経ってから再度お試しください。</p>
      </div>
    `;
  }
}