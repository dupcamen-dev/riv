import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Camera, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { place } from '../../data/restaurant.js'

const footerLinks = [
  { to: '/menu', label: 'Меню' },
  { to: '/', label: 'Популярне', section: 'popular' },
  { to: '/', label: 'Контакти', section: 'contact' },
  { to: '/', label: 'Відгуки', section: 'feedback' },
  { to: '/info', label: 'Інформація' },
  { to: '/terms', label: 'Умови' },
  { to: '/privacy', label: 'Конфіденційність' },
]

export default function Footer({ onOpenBooking }) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  const scrollToSection = (sectionId) => {
    if (currentPath !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-white/6 bg-dark-950">
      <div className="page-content py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4 focus-ring-sm">
              <span className="font-display text-2xl font-black text-cream-50 tracking-tight">
                THE<span className="text-red-500">.</span>RIVER
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Преміальний клуб у Тернополі із заміською атмосферою, авторською кухнею і баром.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-cream-100">Навігація</h4>
            <div className="space-y-2.5">
              {footerLinks.map((link) =>
                link.section ? (
                  <button
                    key={link.section}
                    type="button"
                    onClick={() => scrollToSection(link.section)}
                    className="block px-1 text-left text-sm text-gray-400 transition-colors hover:text-red-400 focus-ring-sm"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-1 text-sm text-gray-400 transition-colors hover:text-red-400 focus-ring-sm"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button
                type="button"
                onClick={onOpenBooking}
                className="block px-1 text-left text-sm text-gray-400 transition-colors hover:text-red-400 focus-ring-sm"
              >
                Бронювання
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-cream-100">Контакти</h4>
            <div className="space-y-3.5">
              <a href={`tel:${place.phone}`} className="flex items-center gap-3 text-sm text-cream-100 transition-colors hover:text-red-400 focus-ring-sm">
                <Phone size={14} className="shrink-0 text-red-400" />
                {place.phone}
              </a>
              <a href={`mailto:${place.email}`} className="flex items-center gap-3 text-sm text-cream-100 transition-colors hover:text-red-400 focus-ring-sm">
                <Mail size={14} className="shrink-0 text-red-400" />
                {place.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-cream-100">
                <MapPin size={14} className="mt-0.5 shrink-0 text-red-400" />
                <span>{place.location}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={place.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-dark-600/20 bg-dark-700/50 text-cream-100 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 focus-ring"
                  title="Instagram"
                >
                  <Camera size={16} />
                </a>
                <a
                  href={place.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center border border-dark-600/20 bg-dark-700/50 text-cream-100 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 focus-ring"
                  title="Facebook"
                >
                  <Globe size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-dark-600/20 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} The River Premium Club.</p>
          <p className="text-xs text-gray-500">Premium dining, bar and atmosphere.</p>
        </div>
      </div>
    </footer>
  )
}