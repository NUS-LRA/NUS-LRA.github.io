import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Mail,
  Globe,
  ArrowRight,
  MapPin,
  Phone,
  Printer,
  Building2,
  Send,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Users
} from 'lucide-react';
import { LAB_INFO, MEMBERS, RESEARCH } from './data.ts';
import { Member, Research, ContactInquiry } from './types.ts';

const LOGO_URL = `${import.meta.env.BASE_URL}logo.webp`;

// Deterministic soft background colour for initials avatars
const AVATAR_PALETTE = [
  'bg-brand-100 text-brand-800',
  'bg-slate-200 text-slate-700',
  'bg-brand-50 text-brand-700',
  'bg-sky-100 text-sky-800',
  'bg-indigo-100 text-indigo-800'
];

const ROLE_SECTIONS: { id: Member['role']; label: string }[] = [
  { id: 'faculty', label: 'Faculty' },
  { id: 'phd', label: 'PhD Students' },
  { id: 'ra', label: 'Research Assistants' },
  { id: 'alumni', label: 'Alumni' }
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ member, size = 'md' }: { member: Member; size?: 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'h-20 w-20 text-xl' : 'h-16 w-16 text-lg';
  const palette = AVATAR_PALETTE[member.id.length % AVATAR_PALETTE.length];
  if (member.avatar) {
    return (
      <img
        src={member.avatar}
        alt={member.name}
        className={`${dims} rounded-2xl object-cover border border-slate-200 shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${dims} ${palette} rounded-2xl flex items-center justify-center font-serif font-bold border border-slate-200/70 shrink-0`}
      aria-hidden="true"
    >
      {getInitials(member.name)}
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-6 flex flex-col hover:border-brand-300 hover:bg-white transition-all duration-300">
      <div className="flex gap-4 items-center">
        <Avatar member={member} />
        <div className="min-w-0">
          <h3 className="font-serif text-lg font-bold text-brand-950 leading-tight truncate">
            {member.name}
          </h3>
          <p className="text-xs font-mono text-brand-700 font-semibold mt-1">
            {member.title}
          </p>
        </div>
      </div>

      {member.bio && (
        <p className="text-sm text-slate-500 mt-4 leading-relaxed">{member.bio}</p>
      )}

      {/* Focus areas hidden for now
      {member.researchInterests && member.researchInterests.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {member.researchInterests.map((interest, idx) => (
              <span key={idx} className="bg-white border border-slate-200 text-slate-600 font-mono text-[10px] px-2 py-0.5 rounded">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
      */}

      {(member.email || member.website) && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="p-1.5 text-slate-400 hover:text-brand-700 rounded-lg hover:bg-slate-100 transition-colors"
              title={`Email ${member.name}`}
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-brand-700 rounded-lg hover:bg-slate-100 transition-colors"
              title={`${member.name}'s homepage`}
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// Resolve a media path. Full URLs (http/https) are used as-is; anything else
// is treated as a file inside the `public/` folder and resolved against the
// deploy base URL so it works on GitHub Pages project pages too.
function resolveMedia(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;
}

function ResearchMedia({ item }: { item: Research }) {
  const src = resolveMedia(item.media);
  if (item.mediaType === 'video') {
    return (
      <video
        className="object-cover w-full h-full"
        src={src}
        poster={item.poster ? resolveMedia(item.poster) : undefined}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }
  return (
    <img
      src={src}
      alt={item.title}
      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [teamRoleFilter, setTeamRoleFilter] = useState<'all' | 'faculty' | 'phd' | 'ra' | 'alumni'>('all');
  const [isScrolled, setIsScrolled] = useState(false);

  const [formState, setFormState] = useState<ContactInquiry>({
    name: '',
    email: '',
    affiliation: '',
    subject: '',
    message: ''
  });
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMembers = MEMBERS.filter((member) =>
    teamRoleFilter === 'all' ? true : member.role === teamRoleFilter
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, affiliation, subject, message } = formState;
    const bodyLines = [
      `Name: ${name}`,
      email ? `Email: ${email}` : '',
      affiliation ? `Affiliation: ${affiliation}` : '',
      '',
      message
    ].filter(Boolean);
    const mailto = `mailto:${LAB_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
    setFormSuccessMessage('Opening your email application. If nothing happens, please email us directly at ' + LAB_INFO.email + '.');
  };

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'research', label: 'Research', href: '#research' },
    { id: 'people', label: 'People', href: '#people' },
    // { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased flex flex-col">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200 py-3'
            : 'bg-white/80 backdrop-blur-sm border-slate-100 py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group" onClick={() => setActiveTab('home')}>
            <img
              src={LOGO_URL}
              alt="Learning and Reasoning Agent Group"
              className="h-11 w-11 rounded-lg object-contain shrink-0"
            />
            <div className="leading-tight">
              <span className="font-serif font-bold text-base text-brand-950 block">
                Learning and Reasoning Agent Group
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 block">
                National University of Singapore
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setActiveTab(link.id)}
                className={`transition-colors hover:text-brand-700 ${
                  activeTab === link.id ? 'text-brand-700 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={() => setActiveTab('contact')}
            className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-brand-800 border border-brand-200 hover:bg-brand-50 transition-colors px-4 py-2 rounded-lg"
          >
            Contact
          </a>
        </div>
      </header>

      {/* HERO + ABOUT — together fill the first viewport */}
      <div className="flex flex-col min-h-[calc(100svh-4.75rem)]">
      {/* HERO */}
      <section id="home" className="relative flex-1 flex items-center py-12 border-b border-slate-100 bg-gradient-to-b from-brand-50/40 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto w-full px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-brand-800">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500"></span>
              School of Computing · NUS
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-brand-950 leading-[1.12]">
              Learning and Reasoning Agents
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {LAB_INFO.tagline}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#research"
                onClick={() => setActiveTab('research')}
                className="inline-flex items-center justify-center bg-brand-800 text-white font-medium text-sm px-6 py-3 rounded-lg hover:bg-brand-900 transition-colors shadow-sm"
              >
                View Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#people"
                onClick={() => setActiveTab('people')}
                className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-700 font-medium text-sm px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Meet the Team
              </a>
            </div>
          </div>

          {/* Side card: research focus summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <BookOpen className="h-4.5 w-4.5 text-brand-700" />
                <span className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Research Areas
                </span>
              </div>
              <ul className="mt-5 space-y-4">
                {['Learning', 'Reasoning', 'Agents'].map((area) => (
                  <li key={area} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0"></span>
                    <div>
                      <p className="font-semibold text-sm text-brand-950">{area}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <GraduationCap className="h-4 w-4 text-brand-700" />
                <span>{LAB_INFO.department}, {LAB_INFO.institution}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-5">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 font-bold block">
              About Our Group
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-950">
              {LAB_INFO.name}
            </h2>
            <div className="h-1 w-16 bg-accent-500 rounded"></div>
            <p className="text-slate-600 leading-relaxed text-base">
              {LAB_INFO.aboutText}
            </p>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-800">Affiliation</p>
                  <p className="text-slate-500 mt-0.5">{LAB_INFO.department}, {LAB_INFO.institution}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-800">Principal Investigator</p>
                  <p className="text-slate-500 mt-0.5">{LAB_INFO.pi}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-slate-800">Enquiries</p>
                  <a href={`mailto:${LAB_INFO.email}`} className="text-brand-700 hover:underline mt-0.5 block break-all">
                    {LAB_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* RESEARCH */}
      <section id="research" className="py-20 bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 font-bold block">
              Research
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-950 mt-2">
              Highlighted Research
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Selected publications from our research on learning and reasoning agents.
            </p>
          </div>

          {/* Research grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm glow-card flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-100 border-b border-slate-100">
                  <ResearchMedia item={item} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {item.venue && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-700 font-semibold mb-1.5">
                      {item.venue}
                    </span>
                  )}
                  <h3 className="font-serif text-lg font-bold text-brand-950 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed flex-1">
                    {item.abstract}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors w-fit"
                    >
                      Read more
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section id="people" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 font-bold block">
              People
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-950 mt-2">
              Our Team
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Meet our current members and alumni.
            </p>
          </div>

          {/* Role tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-100 pb-6">
            {[
              { id: 'all', label: 'All' },
              { id: 'faculty', label: 'Faculty' },
              { id: 'phd', label: 'PhD Students' },
              { id: 'ra', label: 'Research Assistants' },
              { id: 'alumni', label: 'Alumni' }
            ].map((tab) => (
              <button
                id={`member-role-${tab.id}`}
                key={tab.id}
                onClick={() => setTeamRoleFilter(tab.id as any)}
                className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                  teamRoleFilter === tab.id
                    ? 'bg-brand-800 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Members */}
          {teamRoleFilter === 'all' ? (
            <div className="space-y-14">
              {ROLE_SECTIONS.map((section) => {
                const sectionMembers = MEMBERS.filter((m) => m.role === section.id);
                if (sectionMembers.length === 0) return null;
                return (
                  <div key={section.id}>
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-brand-700 font-bold mb-6 pb-2 border-b border-slate-200">
                      {section.label}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sectionMembers.map((member) => (
                        <MemberCard key={member.id} member={member} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-slate-50/70 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 font-bold block">
                Contact
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-950 mt-2">
                Get in Touch
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our group is affiliated with the {LAB_INFO.department}, {LAB_INFO.institution}. We welcome enquiries
              from prospective students and research collaborators.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-slate-800">Address</span>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">{LAB_INFO.location}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Building2 className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-slate-800">Office</span>
                  <p className="text-slate-500 mt-0.5">{LAB_INFO.office}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-slate-800">Phone</span>
                  <p className="text-slate-500 mt-0.5">{LAB_INFO.phone}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Printer className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-slate-800">Fax</span>
                  <p className="text-slate-500 mt-0.5">{LAB_INFO.fax}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-brand-700 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold text-slate-800">Email</span>
                  <a href={`mailto:${LAB_INFO.email}`} className="text-brand-700 hover:underline mt-0.5 block break-all">
                    {LAB_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-brand-950 mb-1">Send an enquiry</h3>
              <p className="text-sm text-slate-500 mb-6">This opens your email application with the details filled in.</p>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Your Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Jane Doe"
                      className="w-full text-sm rounded-lg border border-slate-200 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. jane@example.com"
                      className="w-full text-sm rounded-lg border border-slate-200 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Affiliation</label>
                    <input
                      id="contact-affiliation"
                      type="text"
                      value={formState.affiliation}
                      onChange={(e) => setFormState((prev) => ({ ...prev, affiliation: e.target.value }))}
                      placeholder="e.g. National University of Singapore"
                      className="w-full text-sm rounded-lg border border-slate-200 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Subject *</label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g. PhD enquiry / Collaboration"
                      className="w-full text-sm rounded-lg border border-slate-200 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">Your Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="How can we help?"
                    className="w-full text-sm rounded-lg border border-slate-200 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                {formSuccessMessage && (
                  <div className="flex items-start gap-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 p-4 rounded-lg text-xs sm:text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p>{formSuccessMessage}</p>
                  </div>
                )}

                <button
                  id="submit-contact-form"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-800 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-900 transition-colors cursor-pointer"
                >
                  Compose Email
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-950 text-white pt-14 pb-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-brand-900 pb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Learning and Reasoning Agent Group"
                className="h-9 w-9 rounded-lg bg-white p-0.5 object-contain shrink-0"
              />
              <span className="font-serif font-bold text-base text-white">
                Learning and Reasoning Agent Group
              </span>
            </div>
            <p className="text-xs text-brand-300 leading-relaxed">
              Learning and reasoning agents — machine learning, planning under uncertainty.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold text-brand-400 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="text-xs text-brand-200 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold text-brand-400 uppercase tracking-widest mb-4">School of Computing, NUS</h4>
            <p className="text-xs text-brand-200 leading-relaxed">
              13 Computing Drive<br />
              Singapore 117417<br />
              {LAB_INFO.office}
            </p>
            <a href={`mailto:${LAB_INFO.email}`} className="text-xs text-brand-400 mt-2 block hover:text-white transition-colors">
              {LAB_INFO.email}
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-brand-400 font-mono">
          <p>© {new Date().getFullYear()} Learning and Reasoning Agent Group, NUS.</p>
          <p>Department of Computer Science, School of Computing</p>
        </div>
      </footer>
    </div>
  );
}
