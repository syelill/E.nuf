// === Contact page ===

function ContactPage() {
  const [form, setForm] = React.useState({ name: '', email: '', kind: 'Commission', message: '' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error('failed');
      setSent(true);
      setForm({ name: '', email: '', kind: 'Commission', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-stage">
      <div className="contact-card">
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pencil)' }}>
          a note for the studio
        </div>
        <h1>Leave a note.</h1>
        <p>For commissions, collaborations, exhibitions, or quiet questions from across the internet. The studio reads everything — replies, slowly.</p>

        <a href="mailto:hello@eunicehannah.com" className="contact-email hand-underline">hello@eunicehannah.com</a>

        <form className="contact-form" onSubmit={submit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" name="name" autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="who's writing?" />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" name="email" autoComplete="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="where to write back" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-kind">Enquiry type</label>
            <select id="cf-kind" name="kind" value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value })}>
              <option>Commission</option>
              <option>Exhibition</option>
              <option>Collaboration</option>
              <option>Press / Interview</option>
              <option>Just saying hi</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="tell me about your idea, your space, or the question you've been carrying around…" />
          </div>

          <button type="submit" className="send-stamp" disabled={sending}>
            {sent ? '✓ Note received' : sending ? 'Sending…' : 'Send Note →'}
          </button>
          {error && <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#a4453a', marginTop: 8 }}>Couldn't send — try again, or email hello@eunicehannah.com directly.</div>}
        </form>

        <div className="contact-socials">
          <a href="https://www.instagram.com/1ise.nuf/?hl=en" className="social-icon" aria-label="Instagram"><InstagramIcon /></a>
          <a href="mailto:hello@eunicehannah.com" className="social-icon" aria-label="Email"><MailIcon /></a>
        </div>

        {/* doodles */}
        <div className="contact-doodle" style={{ bottom: 30, right: 60, transform: 'rotate(-6deg)' }}>
          ✎ kept by hand
        </div>
        <svg style={{ position: 'absolute', top: 30, right: 40 }} width="80" height="60" viewBox="0 0 80 60" fill="none">
          <path d="M 5 30 Q 30 5 55 25 T 75 20" stroke="#1f1b15" strokeWidth="1" opacity=".4" />
          <path d="M 68 12 L 75 20 L 65 23" stroke="#1f1b15" strokeWidth="1" opacity=".4" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

Object.assign(window, { ContactPage });
