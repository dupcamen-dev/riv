import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, Soup, Wine, Coffee, GlassWater, BookText } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import DishModal from '../components/ui/MenuItemModal.jsx'
import { sections, allMenuItems } from '../data/restaurant.js'

const sectionIcons = {
  'section:kuhnya': Soup,
  'section:vinna-karta': GlassWater,
  'section:bar': Wine,
  'section:bar-b-a': Coffee,
  'section:pravila': BookText,
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
  const [searchParams, setSearchParams] = useSearchParams()
  const activeSection = searchParams.get('section') || ''
  const [search, setSearch] = useState('')
  const [imgErrors, setImgErrors] = useState({})
  const [activeCategory, setActiveCategory] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const searchQuery = useMemo(() => normalizeSearch(search), [search])

  const validSections = useMemo(() => sections.filter((s) => s.hurl), [])
  const currentSection = useMemo(
    () => validSections.find((s) => s.hurl === activeSection) || validSections[0],
    [validSections, activeSection]
  )

  useEffect(() => {
    const itemHurl = searchParams.get('item')
    if (!itemHurl || selectedItem) return
    const found = allMenuItems.find((i) => i.hurl === itemHurl)
    if (found) {
      setSelectedItem(found)
      for (const section of validSections) {
        for (const cat of Object.values(section.categories)) {
          if (cat.items.some((i) => i.hurl === itemHurl)) {
            setSearchParams({ section: section.hurl, item: itemHurl })
            return
          }
        }
      }
    }
  }, [])

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
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle="Наше меню">Оберіть розділ</SectionTitle>

        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light-400/60 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Пошук страв..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-white/10 bg-dark-800/80 py-3.5 pl-12 pr-10 text-sm text-light-100 placeholder:text-light-400/60 transition-all duration-300 focus:border-gold-400/60 focus:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-gold-500/35"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-light-400 hover:text-light-100 transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start lg:justify-center">
          {validSections.map((section) => {
            const Icon = sectionIcons[section.hurl]
            const isActive = currentSection?.hurl === section.hurl
            return (
              <button
                key={section.hurl}
                type="button"
                onClick={() => selectSection(section)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0 border ${
                  isActive
                    ? 'bg-gold-500 text-dark-900 border-transparent shadow-lg shadow-gold-500/15'
                    : 'glass border-dark-600/30 text-light-400 hover:border-gold-500/30 hover:text-light-100'
                }`}
              >
                {Icon && <Icon size={16} />}
                {section.name}
              </button>
            )
          })}
        </div>

        {currentSection?.hurl === 'section:pravila' ? (
          <div className="max-w-3xl mx-auto space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-light-100 mb-4 flex items-center gap-3">
                <BookText size={22} className="text-gold-500" />
                Правила закладу
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Дресс-код', text: 'Відвідувачі повинні бути одягнені у відповідному стилі. Чоловікам рекомендується діловий або smart casual одяг. Спортивний одяг та взуття не допускаються.' },
                  { title: 'Бронювання столиків', text: 'Бронювання столиків здійснюється за телефоном або через офіційні канали зв\'язку. При запізненні понад 15 хвилин бронювання може бути скасоване.' },
                  { title: 'Політика щодо паління', text: 'Паління дозволене лише у спеціально відведених для цього місцях на терасі. Паління кальяну та електронних сигарет дозволене лише у зонах, визначених адміністрацією.' },
                  { title: 'Вікові обмеження', text: 'Заклад призначений для осіб, які досягли 18 років. Особи, молодші 18 років, можуть перебувати в закладі лише в супроводі батьків до 20:00.' },
                  { title: 'Музичний формат та розваги', text: 'У закладі працює жива музика та DJ-сети. Розклад музичних виступів уточнюйте в адміністрації. Рівень шуму регулюється відповідно до формату вечора.' },
                  { title: 'Правила поведінки', text: 'Гості зобов\'язані дотримуватися правил поведінки в закладі. Забороняється проявляти агресію, порушувати громадський порядок та створювати незручності для інших відвідувачів.' },
                  { title: 'Фото- та відеозйомка', text: 'Фото- та відеозйомка в закладі дозволена для особистого використання. Професійна зйомка потребує попереднього узгодження з адміністрацією.' },
                ].map((rule, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="glass rounded-lg p-5 border border-dark-600/30"
                  >
                    <h4 className="text-sm font-bold text-gold-400 mb-2">{rule.title}</h4>
                    <p className="text-sm text-light-300 leading-relaxed">{rule.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-light-100 mb-4 flex items-center gap-3">
                <BookText size={22} className="text-gold-500" />
                Інформація
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Графік роботи', text: 'Понеділок: 12:00 – 22:00\nВівторок – Неділя: 11:00 – 22:00\nСвяткові дні: графік роботи узгоджується з адміністрацією.' },
                  { title: 'Контакти', text: 'Телефон: +380678287777\nEmail: theriverpremium@gmail.com\nFacebook: facebook.com/theriver.premium\nInstagram: @theriver_premium' },
                  { title: 'Як дістатися', text: 'Заклад знаходиться в центрі Тернополя за адресою вул. Чумацька, 1А. Зручне розташування з доступом до головних транспортних артерій міста.' },
                  { title: 'Паркінг', text: 'Для гостей закладу доступний безкоштовний паркінг поруч із рестораном. Кількість місць обмежена, рекомендуємо бронювати заздалегідь.' },
                  { title: 'Оренда закладу', text: 'Ресторанний комплекс The River пропонує можливість оренди для проведення приватних заходів, банкетів, корпоративів та святкувань. Деталі уточнюйте в адміністрації.' },
                ].map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="glass rounded-lg p-5 border border-dark-600/30"
                  >
                    <h4 className="text-sm font-bold text-gold-400 mb-2">{info.title}</h4>
                    <p className="text-sm text-light-300 leading-relaxed whitespace-pre-line">{info.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : !searchQuery && categoryNavItems.length > 1 && (
          <div className="menu-category-nav -mx-5 mb-12 border-y border-white/10 bg-dark-900/92 px-5 py-3 backdrop-blur-xl sm:-mx-7 sm:px-7 lg:-mx-10 lg:px-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Категорії</p>
                <p className="hidden text-xs text-light-500 sm:block">{categoryNavItems.length} розділів</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-wrap lg:overflow-visible lg:pb-0">
                {categoryNavItems.map((cat) => {
                  const id = getCategoryId(cat)
                  const isActive = selectedCategoryId === id

                  return (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => jumpToCategory(cat)}
                      className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? 'border-transparent bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/15'
                          : 'border-white/10 bg-dark-800/70 text-light-300 hover:border-gold-500/40 hover:text-light-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-xs ${isActive ? 'text-dark-900/70' : 'text-light-500'}`}>
                        {cat.items.length}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        {currentSection?.hurl !== 'section:pravila' && (searchQuery ? (
          <motion.div layout className="max-w-6xl mx-auto">
            <p className="text-sm text-light-500 mb-6 text-center">
              Знайдено: {allFilteredItems.length} шт.
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
                  <Search size={24} className="text-light-500" />
                </div>
                <p className="text-light-400 text-lg mb-2">Нічого не знайдено</p>
                <p className="text-light-500 text-sm mb-6">Спробуйте інший запит</p>
                <button type="button" onClick={() => setSearch('')} className="text-sm text-gold-500 hover:text-gold-400 transition-colors font-medium">
                  Скинути пошук
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
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-light-100">{cat.name}</h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-gold-500/20 to-transparent" />
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
                    <p className="text-light-500 text-sm py-8 text-center">Немає страв у цій категорії</p>
                  )}
                </motion.div>
              </section>
            ))}
          </div>
        ))}
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
      className="group w-full overflow-hidden rounded-lg border border-cream-200 bg-cream-100 text-left transition-all duration-300 hover:border-gold-500/40 hover:bg-cream-50 focus-ring-sm"
      aria-label={`Відкрити страву ${item.name}`}
    >
      <div className="relative h-44 bg-cream-50 overflow-hidden">
        {item.media && !imgError ? (
          <img
            src={getDishImage(item.media)}
            alt={item.name}
            loading="lazy"
            onError={() => onImgError(item._id)}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cream-50">
            <span className="text-5xl text-gold-500/10 font-serif">✦</span>
          </div>
        )}
        {item.alcohol > 0 && (
          <span className="absolute top-3 right-3 bg-cream-50/80 backdrop-blur-sm text-[10px] text-gold-600 px-2 py-0.5 rounded-full border border-gold-500/20 font-semibold">
            18+
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-lg bg-cream-100/90 px-3 py-1.5 text-xs font-semibold text-dark-900 opacity-0 shadow-lg shadow-black/25 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          Детальніше
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-sm font-semibold text-dark-900 group-hover:text-gold-600 transition-colors leading-snug flex-1 min-w-0">
            {item.name}
          </h4>
          <span className="text-base font-bold text-gold-600 whitespace-nowrap shrink-0 tabular-nums">
            {item.price.toLocaleString('uk-UA')} ₴
          </span>
        </div>
        {item.description && (
          <p className="text-xs text-dark-600 mt-2 leading-relaxed line-clamp-2">{item.description}</p>
        )}
        {item.categoryName && (
          <p className="text-xs text-dark-600 mt-3">{item.categoryName}</p>
        )}
        {item.weight && (
          <p className="text-xs text-dark-600 mt-2">{item.weight} {item.weightType === 'ml' ? 'мл' : 'г'}</p>
        )}
      </div>
    </motion.button>
  )
}


