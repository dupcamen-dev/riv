import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, Clock, Mail, Phone, Users, X } from 'lucide-react'
import Button from '../ui/Button.jsx'
import FormInput from '../ui/FormInput.jsx'
import FormSelect from '../ui/FormSelect.jsx'
import FormTextarea from '../ui/FormTextarea.jsx'
import { place } from '../../data/restaurant.js'

const initialForm = { name: '', phone: '', email: '', date: '', time: '', guests: '2', comment: '' }

const todayISO = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

const validationRules = {
  name: (value) => {
    if (!value.trim()) return "Введіть ім'я"
    if (value.trim().length < 2) return "Ім'я має містити щонайменше 2 символи"
    return null
  },
  phone: (value) => {
    if (!value.trim()) return 'Введіть номер телефону'
    if (!/^[\d\s+\-()]+$/.test(value)) return 'Невірний формат номера'
    return null
  },
  email: (value) => {
    if (!value) return null
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Невірна email адреса'
    return null
  },
  date: (value) => {
    if (!value) return 'Оберіть дату'
    if (value < todayISO()) return 'Оберіть сьогоднішню або майбутню дату'
    return null
  },
  time: (value) => {
    if (!value) return 'Оберіть час'
    return null
  },
}

export default function BookingModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) return

    setTimeout(() => {
      setSubmitted(false)
      setIsSubmitting(false)
    }, 220)
  }, [open])

  if (!open) return null

  const setFieldValue = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))

    if (errors[field]) {
      const nextErrors = { ...errors }
      delete nextErrors[field]
      setErrors(nextErrors)
    }
  }

  const update = (field) => (event) => {
    setFieldValue(field, event.target.value)
  }

  const validate = () => {
    const nextErrors = {}

    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](form[field])
      if (error) nextErrors[field] = error
    })

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const resetForm = () => {
    setSubmitted(false)
    setForm(initialForm)
    setErrors({})
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/72 px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto border border-cream-200 bg-cream-50 shadow-2xl shadow-black/50"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-cream-100/80 text-dark-600 shadow-lg shadow-black/25 backdrop-blur-sm transition-colors hover:text-dark-900 focus-ring-sm"
          aria-label="Закрити бронювання"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="border-b border-cream-200 bg-cream-100/55 p-6 lg:border-b-0 lg:border-r lg:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Бронювання</p>
            <h2 id="booking-modal-title" className="font-serif text-4xl font-bold leading-none text-dark-900">
              Забронюйте столик
            </h2>
            <p className="mt-4 text-sm leading-7 text-dark-700">
              Залиште контакти, дату та час. Менеджер зв'яжеться з вами для підтвердження бронювання.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a href={`tel:${place.phone}`} className="flex items-center gap-3 text-dark-700 transition-colors hover:text-gold-600">
                <Phone size={16} className="text-gold-600" />
                {place.phone}
              </a>
              <a href={`mailto:${place.email}`} className="flex items-center gap-3 text-dark-700 transition-colors hover:text-gold-600">
                <Mail size={16} className="text-gold-600" />
                {place.email}
              </a>
              <div className="flex items-start gap-3 text-dark-600">
                <Clock size={16} className="mt-0.5 text-gold-600" />
                <span>Пн-Чт: 12:00-22:00<br />Пт-Сб: 12:00-23:00<br />Нд: 11:00-22:00</span>
              </div>
            </div>
          </aside>

          <div className="p-6 lg:p-8">
            {submitted ? (
              <div className="flex min-h-[27rem] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center border border-gold-600/25 bg-gold-500/10">
                  <CheckCircle className="text-gold-600" size={40} />
                </div>
                <h3 className="font-serif text-4xl font-bold text-dark-900">Запит відправлено</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-dark-700">
                  Ми отримали ваш запит. Найближчим часом менеджер зв'яжеться з вами для підтвердження.
                </p>
                <Button type="button" variant="outline" size="md" className="mt-8" onClick={resetForm}>
                  Надіслати ще один
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Ім'я"
                    required
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Ваше ім'я"
                    error={errors.name}
                    disabled={isSubmitting}
                  />
                  <FormInput
                    label="Телефон"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+380 XX XXX XXXX"
                    error={errors.phone}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormInput
                    label="Дата"
                    required
                    type="date"
                    value={form.date}
                    onChange={update('date')}
                    icon={Calendar}
                    error={errors.date}
                    disabled={isSubmitting}
                  />
                  <FormInput
                    label="Час"
                    required
                    type="time"
                    value={form.time}
                    onChange={update('time')}
                    icon={Clock}
                    error={errors.time}
                    disabled={isSubmitting}
                  />
                  <FormSelect
                    label="Гості"
                    value={form.guests}
                    onChange={update('guests')}
                    icon={Users}
                    disabled={isSubmitting}
                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
                      value: n,
                      label: `${n} ${n === 1 ? 'гість' : n < 5 ? 'гості' : 'гостей'}`,
                    }))}
                  />
                </div>

                <FormInput
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="your@email.com"
                  error={errors.email}
                  disabled={isSubmitting}
                  showValidation={false}
                />

                <FormTextarea
                  label="Коментар"
                  rows={3}
                  value={form.comment}
                  onChange={update('comment')}
                  placeholder="Особливі побажання..."
                  disabled={isSubmitting}
                  showValidation={false}
                />

                <Button type="submit" size="lg" loading={isSubmitting} disabled={isSubmitting} className="w-full">
                  Відправити
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
