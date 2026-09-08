export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = "5898116466";

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: data });
  }

  return res.status(200).json({ success: true });
}
