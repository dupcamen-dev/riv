import { motion } from 'framer-motion'
import { BookText } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'

export default function Pravila() {
  return (
    <div className="page-container pb-24">
      <div className="page-content">
        <SectionTitle subtitle="Правила та інформація">Про заклад</SectionTitle>

        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-cream-50 mb-4 flex items-center gap-3">
              <BookText size={22} className="text-red-500" />
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
                  <h4 className="text-sm font-bold text-red-400 mb-2">{rule.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{rule.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-cream-50 mb-4 flex items-center gap-3">
              <BookText size={22} className="text-red-500" />
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
                  <h4 className="text-sm font-bold text-red-400 mb-2">{info.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{info.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
