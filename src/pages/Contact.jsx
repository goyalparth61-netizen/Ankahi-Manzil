import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Copy, ExternalLink, Mail, MessageSquareText, Send } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

const teamEmail = 'goyalparth61@gmail.com'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [copied, setCopied] = useState(false)

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = form.subject.trim() || 'Ankahi Manzil enquiry'
    const body = [
      'Hello Team CiPher,',
      '',
      form.message.trim(),
      '',
      'From: ' + form.name,
      'Reply email: ' + form.email,
    ].join('\n')

    const gmailUrl =
      'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(teamEmail) +
      '&su=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body)

    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
  }

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(teamEmail)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <PageTransition>
      <section className="pro-page">
        <div className="pro-hero">
          <div className="eyebrow">
            <MessageSquareText size={13} className="text-am-cyan" />
            Contact Team CiPher
          </div>
          <h1>
            Let’s talk about
            <span className="block serif-accent">the next journey.</span>
          </h1>
          <p className="lede">
            Questions, collaboration, feedback or project discussions—use the form below and Gmail will open with your message prepared.
          </p>
        </div>

        <div className="page-shell contact-grid px-0">
          <aside className="space-y-3">
            <motion.div
              className="contact-method"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-am-gold">
                <Mail size={14} />
                Project Gmail
              </div>
              <p className="mt-3 text-sm font-semibold">{teamEmail}</p>
              <button type="button" onClick={copyEmail} className="button-ghost mt-4">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </motion.div>

            <motion.a
              href="https://in.linkedin.com/in/parth-goyal-215231385"
              target="_blank"
              rel="noreferrer"
              className="contact-method block"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .06 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-am-cyan">
                <ExternalLink size={14} />
                Parth Goyal
              </div>
              <p className="mt-2 text-sm text-text-secondary">B.Tech CSE — Cyber Security</p>
            </motion.a>

            <motion.a
              href="https://in.linkedin.com/in/archisharma158"
              target="_blank"
              rel="noreferrer"
              className="contact-method block"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: .12 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-am-purple">
                <ExternalLink size={14} />
                Archi Sharma
              </div>
              <p className="mt-2 text-sm text-text-secondary">B.Tech CSE — AI & ML</p>
            </motion.a>
          </aside>

          <motion.form
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .08 }}
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-text-muted">Send a message</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-.035em]">Open a prepared Gmail draft</h2>
              <p className="mt-2 text-xs leading-6 text-text-muted">
                No message is stored on this frontend. Submitting opens Gmail with your details prefilled.
              </p>
            </div>

            <div className="contact-form-grid mt-6">
              <div>
                <label className="field-label" htmlFor="name">Name</label>
                <input id="name" name="name" className="input" value={form.name} onChange={update} required placeholder="Your name" />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="input" value={form.email} onChange={update} required placeholder="you@example.com" />
              </div>
            </div>

            <div className="mt-4">
              <label className="field-label" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" className="input" value={form.subject} onChange={update} placeholder="Project discussion / collaboration / feedback" />
            </div>

            <div className="mt-4">
              <label className="field-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="textarea min-h-40 resize-y"
                value={form.message}
                onChange={update}
                required
                placeholder="Tell Team CiPher what you’d like to discuss…"
              />
            </div>

            <button type="submit" className="button-primary mt-5">
              <Send size={14} />
              Continue in Gmail
            </button>
          </motion.form>
        </div>
      </section>
    </PageTransition>
  )
}
