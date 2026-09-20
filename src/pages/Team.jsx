import { motion } from 'framer-motion'
import { Linkedin, Mail, Shield, Sparkles, BrainCircuit } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'

const teamEmail = 'goyalparth61@gmail.com'

const members = [
  {
    name: 'Parth Goyal',
    initials: 'PG',
    degree: 'B.Tech CSE — Cyber Security',
    track: 'Cyber Security',
    description: 'Computer Science student specializing in Cyber Security and a core member of Team CiPher.',
    icon: Shield,
    accent: 'text-am-cyan',
    linkedin: 'https://in.linkedin.com/in/parth-goyal-215231385',
  },
  {
    name: 'Archi Sharma',
    initials: 'AS',
    degree: 'B.Tech CSE — AI & ML',
    track: 'Artificial Intelligence & Machine Learning',
    description: 'Computer Science student specializing in AI & ML and a core member of Team CiPher.',
    icon: BrainCircuit,
    accent: 'text-am-purple',
    linkedin: 'https://in.linkedin.com/in/archisharma158',
  },
]

export default function Team() {
  const gmailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(teamEmail) + '&su=' + encodeURIComponent('Ankahi Manzil — Team CiPher')

  return (
    <PageTransition>
      <section className="pro-page">
        <div className="pro-hero">
          <div className="eyebrow">
            <Sparkles size={13} className="text-am-gold" />
            Team CiPher
          </div>
          <h1>
            Two disciplines.
            <span className="block serif-accent">One product vision.</span>
          </h1>
          <p className="lede">
            Ankahi Manzil is built by Team CiPher, bringing together Cyber Security and Artificial Intelligence & Machine Learning perspectives into one travel-tech product.
          </p>
        </div>

        <div className="page-shell px-0">
          <div className="team-grid">
            {members.map((member, index) => {
              const Icon = member.icon
              return (
                <motion.article
                  key={member.name}
                  className="team-card flex flex-col"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: .55, delay: index * .08 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative z-[1]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="team-monogram">{member.initials}</div>
                      <span className={'grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[.03] ' + member.accent}>
                        <Icon size={17} />
                      </span>
                    </div>

                    <span className="team-role">{member.track}</span>

                    <h2 className="mt-5 text-3xl font-semibold tracking-[-.045em]">{member.name}</h2>
                    <p className="mt-2 text-sm font-semibold text-white/78">{member.degree}</p>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-text-secondary">{member.description}</p>
                  </div>

                  <div className="team-links relative z-[1]">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="button-primary"
                    >
                      <Linkedin size={15} />
                      LinkedIn
                    </a>
                    <a
                      href={gmailLink}
                      target="_blank"
                      rel="noreferrer"
                      className="button-ghost"
                    >
                      <Mail size={15} />
                      Gmail
                    </a>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.div
            className="surface rounded-art mt-5 grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-am-gold">Project contact</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-.035em]">Want to discuss Ankahi Manzil?</h2>
              <p className="mt-2 text-sm text-text-secondary">{teamEmail}</p>
            </div>
            <a href={gmailLink} target="_blank" rel="noreferrer" className="button-primary">
              <Mail size={15} />
              Email Team CiPher
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
