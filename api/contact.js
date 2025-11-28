export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 2. Your specific Zapier Webhook URL
    const zapierUrl = 'https://hooks.zapier.com/hooks/catch/19867794/uk1d3yi/';

    // 3. Forward the form data to Zapier
    const response = await fetch(zapierUrl, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 4. Handle Zapier's response
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('Zapier webhook failed');
    }

  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
}
