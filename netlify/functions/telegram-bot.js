exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  
    try {
      const { name, phone, business, message } = JSON.parse(event.body);
  
      // ⚠️ ВСТАВЬТЕ СЮДА СВОИ ДАННЫЕ (быстрый способ)
      // Или используйте переменные окружения Netlify (безопасный способ)
      const BOT_TOKEN = process.env.BOT_TOKEN || '8919160874:AAF0wcugxw95gVveUhH4qJeo3okpt9-pylI';
      const CHAT_ID = process.env.CHAT_ID || '6125519621';
  
      const text = `🔔 <b>Нова заявка з сайту!</b>\n\n` +
        `👤 <b>Ім'я:</b> ${name}\n` +
        `📱 <b>Телефон:</b> ${phone}\n` +
        `🏢 <b>Бізнес:</b> ${business || 'Не вказано'}\n` +
        `💬 <b>Повідомлення:</b> ${message || 'Немає'}`;
  
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      });
  
      const data = await response.json();
  
      if (!data.ok) throw new Error(data.description);
  
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true })
      };
  
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message })
      };
    }
  };