// Vercel serverless function — emails contact-form submissions.
// Requires env var RESEND_API_KEY (see README "Contact form" section).
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, kind, message } = req.body || {};
  if (!email || !message) return res.status(400).json({ error: 'Missing required fields' });
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Email service not configured' });
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'E.NUF Studio <onboarding@resend.dev>',
        to: ['hello@eunicehannah.com'],
        reply_to: email,
        subject: `New note from ${name || 'someone'} — ${kind || 'General'}`,
        text: `From: ${name || 'unknown'} <${email}>\nType: ${kind || 'General'}\n\n${message}`
      })
    });
    if (!r.ok) return res.status(502).json({ error: 'Send failed' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
