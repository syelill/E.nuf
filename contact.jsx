emailjs.init({
    publicKey: "bedY2xBo31niInqLw",
});

function ContactPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    kind: "Commission",
    message: "",
  });

  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setSending(true);
    setError(false);

    try {
      await emailjs.send(
    "service_07eht8l",
    "template_4rgw3yl",
    {
        from_name: form.name,
        reply_to: form.email,
        enquiry_type: form.kind,
        message: form.message,
    }
);

      setSent(true);

      setForm({
        name: "",
        email: "",
        kind: "Commission",
        message: "",
      });

      setTimeout(() => setSent(false), 3000);

    } catch (err) {
      console.error(err);

      setError(true);

      setTimeout(() => setError(false), 4000);

    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-stage">
      <div className="contact-card">

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--pencil)",
          }}
        >
          a note for the studio
        </div>

        <h1>Leave a note.</h1>

        <p>
          For commissions, collaborations, exhibitions,
          or quiet questions from across the internet.
          The studio reads everything — replies, slowly.
        </p>

        <a
          href="mailto:hello@eunicehannah.com"
          className="contact-email hand-underline"
        >
          hello@eunicehannah.com
        </a>

        <form className="contact-form" onSubmit={submit}>

          <div className="field-row">

            <div className="field">
              <label htmlFor="cf-name">Name</label>

              <input
                id="cf-name"
                name="name"
                autoComplete="name"
                placeholder="who's writing?"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="field">
              <label htmlFor="cf-email">Email</label>

              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="where to write back"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

          </div>

          <div className="field">
            <label htmlFor="cf-kind">Enquiry type</label>

            <select
              id="cf-kind"
              name="kind"
              value={form.kind}
              onChange={(e) =>
                setForm({
                  ...form,
                  kind: e.target.value,
                })
              }
            >
              <option>Commission</option>
              <option>Exhibition</option>
              <option>Collaboration</option>
              <option>Press / Interview</option>
              <option>Just saying hi</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="cf-message">Message</label>

            <textarea
              id="cf-message"
              name="message"
              placeholder="tell me about your idea, your space, or the question you've been carrying around…"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="send-stamp"
            disabled={sending}
          >
            {sending
              ? "Sending..."
              : sent
              ? "✓ Note received"
              : "Send Note →"}
          </button>

          {sent && (
            <div
              style={{
                marginTop: 10,
                color: "#4a6b4d",
                fontFamily: "var(--mono)",
                fontSize: 11,
              }}
            >
              ✦ Thank you. Your note has been delivered successfully.
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: 10,
                color: "#a4453a",
                fontFamily: "var(--mono)",
                fontSize: 11,
              }}
            >
              Couldn't send your note. Please email
              hello@eunicehannah.com directly.
            </div>
          )}

        </form>

        <div className="contact-socials">
          <a
            href="https://www.instagram.com/1ise.nuf/?hl=en"
            className="social-icon"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>

          <a
            href="mailto:hello@eunicehannah.com"
            className="social-icon"
            aria-label="Email"
          >
            <MailIcon />
          </a>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { ContactPage });