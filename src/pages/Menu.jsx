import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Soup, Wine, Coffee, GlassWater } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import DishModal from '../components/ui/MenuItemModal.jsx'
import { sections, allMenuItems } from '../data/restaurant.js'
import { useT } from '../i18n/context.jsx'

const sectionIcons = {
  'section:kuhnya': Soup,
  'section:vinna-karta': GlassWater,
  'section:bar': Wine,
  'section:bar-b-a': Coffee,
}

const itemAnim = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

const getCategoryId = (cat) => `category-${cat.hurl || cat._id}`

const normalizeSearch = (value) => value.trim().toLocaleLowerCase('uk-UA')

const matchesSearch = (item, query) => {
  if (!query) return true

  return [item.name, item.description, item.categoryName]
    .filter(Boolean)
    .some((value) => value.toLocaleLowerCase('uk-UA').includes(query))
}

const resolveUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('/img/')) return import.meta.env.BASE_URL + url.slice(1)
  return url
}

const getDishImage = (media, mode = 'card') => {
  if (!media) return ''

  const url = mode === 'modal'
    ? (media.webp?.big || media.big || media.webp?.medium || media.medium || media.webp?.url || media.url || media.thumbnail)
    : (media.webp?.medium || media.medium || media.webp?.url || media.url || media.big || media.thumbnail)

  return resolveUrl(url)
}

export default function Menu() {
  const t = useT()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSection = searchParams.get('section') || ''
  const [search, setSearch] = useState('')
  const [imgErrors, setImgErrors] = useState({})
  const [activeCategory, setActiveCategory] = useState('')
  const searchQuery = useMemo(() => normalizeSearch(search), [search])

  const validSections = useMemo(() => sections.filter((s) => s.hurl && s.hurl !== 'section:pravila'), [])
  const initialItemHurl = searchParams.get('item')
  const [selectedItem, setSelectedItem] = useState(
    () => initialItemHurl ? allMenuItems.find((i) => i.hurl === initialItemHurl) || null : null
  )

  const currentSection = useMemo(
    () => validSections.find((s) => s.hurl === activeSection) || validSections[0],
    [validSections, activeSection]
  )

  const filteredCategories = useMemo(() => {
    if (!currentSection) return []
    const cats = Object.values(currentSection.categories)
    if (!searchQuery) return cats
    return cats
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => matchesSearch(item, searchQuery)),
      }))
      .filter((cat) => cat.items.length > 0)
  }, [currentSection, searchQuery])

  const categoryNavItems = useMemo(() => {
    if (!currentSection || searchQuery) return []
    return Object.values(currentSection.categories).filter((cat) => cat.items.length > 0)
  }, [currentSection, searchQuery])

  const categoryIds = useMemo(() => categoryNavItems.map(getCategoryId), [categoryNavItems])
  const selectedCategoryId = categoryIds.includes(activeCategory) ? activeCategory : categoryIds[0] || ''

  const allFilteredItems = useMemo(() => {
    if (!searchQuery) return []
    return allMenuItems.filter((item) => matchesSearch(item, searchQuery))
  }, [searchQuery])

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }))
  }

  const jumpToCategory = (cat) => {
    const id = getCategoryId(cat)
    setActiveCategory(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectSection = (section) => {
    setSearch('')
    setActiveCategory('')
    setSearchParams({ section: section.hurl })
    setTimeout(() => {
      const el = document.querySelector('.menu-section-tabs')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  useEffect(() => {
    if (categoryNavItems.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (visible?.target?.id) {
          setActiveCategory(visible.target.id)
        }
      },
      { rootMargin: '-28% 0px -55% 0px', threshold: 0.01 }
    )

    categoryNavItems.forEach((cat) => {
      const element = document.getElementById(getCategoryId(cat))
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [categoryNavItems])

  return (
    <div className="page-container pb-24 bg-dark-700">
      <div className="page-content">
        <SectionTitle subtitle={t('menu.subtitle')}>{t('menu.title')}</SectionTitle>

        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder={t('menu.search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-white/10 bg-dark-800/80 py-3.5 pl-12 pr-10 text-sm text-cream-100 placeholder:text-gray-500 transition-all duration-300 focus:border-red-400/60 focus:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-red-500/35"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cream-50 transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="menu-section-tabs sticky z-30 -mx-5 px-5 pb-2 mb-6 border-b border-white/6 bg-dark-900/90 backdrop-blur-xl sm:-mx-7 sm:px-7 lg:-mx-10 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex gap-1 overflow-x-auto pb-1.5 pt-2 scrollbar-none justify-start lg:flex-wrap lg:overflow-visible lg:justify-center">
              {validSections.map((section) => {
                const Icon = sectionIcons[section.hurl]
                const isActive = currentSection?.hurl === section.hurl
                return (
                  <button
                    key={section.hurl}
                    type="button"
                    onClick={() => selectSection(section)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-red-500 text-cream-50 shadow-sm shadow-red-500/15'
                        : 'text-gray-400 hover:text-cream-50 hover:bg-dark-700/50'
                    }`}
                  >
                    {Icon && <Icon size={14} className="inline mr-1 -mt-0.5" />}
                    <span>{section.name}</span>
                  </button>
                )
              })}
            </div>
            {!searchQuery && categoryNavItems.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none lg:flex-wrap lg:overflow-visible">
                {categoryNavItems.map((cat) => {
                  const id = getCategoryId(cat)
                  const isActive = selectedCategoryId === id
                  const displayName = cat.name.charAt(0) + cat.name.slice(1).toLowerCase()

                  return (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => jumpToCategory(cat)}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? 'bg-red-500 text-cream-50 shadow-sm shadow-red-500/15'
                          : 'text-gray-400 hover:text-cream-50 hover:bg-dark-700/50'
                      }`}
                    >
                      {displayName}
                      <span className={`ml-1.5 ${isActive ? 'text-cream-50/60' : 'text-gray-500'}`}>{cat.items.length}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
        {searchQuery ? (
          <motion.div layout className="max-w-6xl mx-auto">
            <p className="text-sm text-gray-500 mb-6 text-center">
              {t('menu.found_count', { count: allFilteredItems.length })}
            </p>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allFilteredItems.map((item) => (
                <MenuItemCard
                  key={item._id}
                  item={item}
                  imgError={imgErrors[item._id]}
                  onImgError={handleImgError}
                  onOpen={() => setSelectedItem(item)}
                />
              ))}
            </motion.div>
            {allFilteredItems.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-dark-800/60 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg mb-2">{t('menu.not_found')}</p>
                <p className="text-gray-500 text-sm mb-6">{t('menu.try_another')}</p>
                <button type="button" onClick={() => setSearch('')} className="text-sm text-red-500 hover:text-red-400 transition-colors font-medium">
                  {t('menu.reset_search')}
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-14">
            {filteredCategories.map((cat) => (
              <section key={cat._id} id={getCategoryId(cat)} className="menu-category-section">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-30px' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-cream-50">{cat.name}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-red-500/20 to-transparent" />
                  </div>
                  {cat.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.items.map((item) => (
                        <MenuItemCard
                          key={item._id}
                          item={item}
                          imgError={imgErrors[item._id]}
                          onImgError={handleImgError}
                          onOpen={() => setSelectedItem(item)}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm py-8 text-center">{t('menu.no_items')}</p>
                  )}
                </motion.div>
              </section>
            ))}
            {currentSection?.hurl === 'section:vinna-karta' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="text-center pt-6 border-t border-white/10"
              >
                <p className="text-sm text-gray-400 mb-3">{t('menu.looking_for_more')}</p>
                <button
                  type="button"
                  onClick={() => selectSection(validSections.find((s) => s.hurl === 'section:bar'))}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-dark-800/50 px-6 py-3 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-cream-50 hover:shadow-lg hover:shadow-red-500/15"
                >
                  <Wine size={16} />
                  {t('menu.go_to_bar')}
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
      <DishModal
        item={selectedItem}
        imgError={selectedItem ? imgErrors[selectedItem._id] : false}
        onImgError={handleImgError}
        onClose={() => {
          setSelectedItem(null)
          if (searchParams.get('item')) {
            const params = new URLSearchParams(searchParams)
            params.delete('item')
            setSearchParams(params, { replace: true })
          }
        }}
      />
    </div>
  )
}

function MenuItemCard({ item, imgError, onImgError, onOpen }) {
  const t = useT()
  return (
    <motion.button
      type="button"
      variants={itemAnim}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      whileHover={{ y: -3 }}
      onClick={onOpen}
      className="group w-full overflow-hidden rounded-lg border border-cream-200 bg-cream-50 text-left transition-all duration-300 hover:border-red-500/30 hover:bg-cream-100 focus-ring-sm shadow-lg shadow-black/10"
      aria-label={t('menu.open_dish', { name: item.name })}
    >
      <div className="relative h-44 bg-cream-100 overflow-hidden">
        {item.media && !imgError ? (
          <img
            src={getDishImage(item.media)}
            alt={item.name}
            loading="lazy"
            onError={() => onImgError(item._id)}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cream-100">
            <span className="text-5xl text-red-500/20 font-display">✦</span>
          </div>
        )}
        {item.alcohol > 0 && (
          <span className="absolute top-3 right-3 bg-cream-50/80 backdrop-blur-sm text-[10px] text-red-500 px-2 py-0.5 rounded-full border border-red-500/30 font-semibold">
            18+
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-lg bg-dark-900/90 px-3 py-1.5 text-xs font-semibold text-cream-50 opacity-0 shadow-lg shadow-black/25 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          {t('menu.details')}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-sm font-semibold text-dark-900 group-hover:text-red-500 transition-colors leading-snug flex-1 min-w-0">
            {item.name}
          </h4>
          <span className="text-base font-bold text-red-500 whitespace-nowrap shrink-0 tabular-nums">
            {item.price.toLocaleString('uk-UA')} ₴
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2">{item.description}</p>
        )}
        {item.categoryName && (
          <p className="text-xs text-gray-500 mt-3">{item.categoryName}</p>
        )}
        {item.weight && (
          <p className="text-xs text-gray-500 mt-2">{item.weight} {item.weightType === 'ml' ? t('menu.weight_ml') : t('menu.weight_g')}</p>
        )}
      </div>
    </motion.button>
  )
}
