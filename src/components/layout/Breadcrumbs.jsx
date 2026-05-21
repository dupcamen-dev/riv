import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { useT } from '../../i18n/context.jsx'

const pathKeys = {
  '/': 'breadcrumb.home',
  '/menu': 'breadcrumb.menu',
  '/info': 'breadcrumb.info',
  '/terms': 'breadcrumb.terms',
  '/privacy': 'breadcrumb.privacy',
  '/pravila': 'breadcrumb.pravila',
}

export default function Breadcrumbs() {
  const location = useLocation()
  const t = useT()

  if (location.pathname === '/') return null

  const parts = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { label: t('breadcrumb.home'), to: '/' },
    ...parts.map((part, index) => {
      const path = '/' + parts.slice(0, index + 1).join('/')
      return { label: pathKeys[path] ? t(pathKeys[path]) : part, to: path }
    }),
  ]

  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.to} className="flex items-center gap-2">
            {index === 0 && (
              <>
                <Link
                  to={crumb.to}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-gold-400 transition-colors focus-ring-sm rounded px-1.5"
                >
                  <Home size={16} />
                  <span className="hidden sm:inline">{crumb.label}</span>
                </Link>
              </>
            )}
            {index > 0 && (
              <>
                <ChevronRight size={16} className="text-gray-500 mx-0.5" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gold-400 font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="text-gray-400 hover:text-gold-400 transition-colors focus-ring-sm rounded px-1.5"
                  >
                    {crumb.label}
                  </Link>
                )}
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
