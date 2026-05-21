import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, Clock, Mail, Phone, Users, X } from 'lucide-react'
import Button from '../ui/Button.jsx'
import FormInput from '../ui/FormInput.jsx'
import FormSelect from '../ui/FormSelect.jsx'
import FormTextarea from '../ui/FormTextarea.jsx'
import { place } from '../../data/restaurant.js'
import { useT } from '../../i18n/context.jsx'

const initialForm = { name: '', phone: '', email: '', date: '', time: '', guests: '2', comment: '' }

const todayISO = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export default function BookingModal({ open, onClose }) {
  const t = useT()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationRules = {
    name: (value) => {
      if (!value.trim()) return t('booking.err_name')
      if (value.trim().length < 2) return t('booking.err_name_min')
      return null
    },
    phone: (value) => {
      if (!value.trim()) return t('booking.err_phone_empty')
      if (!/^[\d\s+\-()]+$/.test(value)) return t('booking.err_phone')
      return null
    },
    email: (value) => {
      if (!value) return null
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t('booking.err_email')
      return null
    },
    date: (value) => {
      if (!value) return t('booking.err_date')
      if (value < todayISO()) return t('booking.err_date_future')
      return null
    },
    time: (value) => {
      if (!value) return t('booking.err_time')
      return null
    },
  }

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

  const guestLabel = (n) => {
    if (n === 1) return t('booking.guest_1')
    if (n >= 2 && n <= 4) return t('booking.guest_2_4')
    return t('booking.guest_5')
  }

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
        className="relative max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-white/10 bg-dark-900 shadow-2xl shadow-red-500/10"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-dark-800/80 text-gray-400 shadow-lg shadow-black/25 backdrop-blur-sm transition-colors hover:text-cream-50 focus-ring-sm"
          aria-label={t('booking.close')}
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="border-b border-white/10 bg-dark-800/55 p-6 lg:border-b-0 lg:border-r lg:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-red-500">{t('booking.aside')}</p>
            <h2 id="booking-modal-title" className="font-display text-4xl font-bold leading-none text-cream-50">
              {t('booking.title')}
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-400">
              {t('booking.desc')}
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a href={`tel:${place.phone}`} className="flex items-center gap-3 text-gray-400 transition-colors hover:text-red-400">
                <Phone size={16} className="text-red-500" />
                {place.phone}
              </a>
              <a href={`mailto:${place.email}`} className="flex items-center gap-3 text-gray-400 transition-colors hover:text-red-400">
                <Mail size={16} className="text-red-500" />
                {place.email}
              </a>
              <div className="flex items-start gap-3 text-gray-500">
                <Clock size={16} className="mt-0.5 text-red-500" />
                <span>{t('booking.hours')}</span>
              </div>
            </div>
          </aside>

          <div className="p-6 lg:p-8">
            {submitted ? (
              <div className="flex min-h-[27rem] flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-lg border border-red-500/25 bg-red-500/10">
                  <CheckCircle className="text-red-500" size={40} />
                </div>
                <h3 className="font-display text-4xl font-bold text-cream-50">{t('booking.success_title')}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
                  {t('booking.success_text')}
                </p>
                <Button type="button" variant="outline" size="md" className="mt-8" onClick={resetForm}>
                  {t('booking.send_another')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label={t('booking.name')}
                    required
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder={t('booking.name_placeholder')}
                    error={errors.name}
                    disabled={isSubmitting}
                  />
                  <FormInput
                    label={t('booking.phone')}
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
                    label={t('booking.date')}
                    required
                    type="date"
                    value={form.date}
                    onChange={update('date')}
                    icon={Calendar}
                    error={errors.date}
                    disabled={isSubmitting}
                  />
                  <FormInput
                    label={t('booking.time')}
                    required
                    type="time"
                    value={form.time}
                    onChange={update('time')}
                    icon={Clock}
                    error={errors.time}
                    disabled={isSubmitting}
                  />
                  <FormSelect
                    label={t('booking.guests')}
                    value={form.guests}
                    onChange={update('guests')}
                    icon={Users}
                    disabled={isSubmitting}
                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
                      value: n,
                      label: `${n} ${guestLabel(n)}`,
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
                  label={t('booking.comment')}
                  rows={3}
                  value={form.comment}
                  onChange={update('comment')}
                  placeholder={t('booking.comment_placeholder')}
                  disabled={isSubmitting}
                  showValidation={false}
                />

                <Button type="submit" size="lg" loading={isSubmitting} disabled={isSubmitting} className="w-full">
                  {t('booking.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
