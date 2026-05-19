import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Calendar, Clock, Users, CheckCircle } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import FormInput from '../components/ui/FormInput.jsx'
import FormTextarea from '../components/ui/FormTextarea.jsx'
import FormSelect from '../components/ui/FormSelect.jsx'
import { place } from '../data/restaurant.js'

const initialForm = { name: '', phone: '', email: '', date: '', time: '', guests: '2', comment: '' }

const todayISO = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

// Simple validation rules
const validationRules = {
  name: (value) => {
    if (!value.trim()) return 'Введіть ім\'я'
    if (value.trim().length < 2) return 'Ім\'я повинно мати мінімум 2 символи'
    return null
  },
  phone: (value) => {
    if (!value.trim()) return 'Введіть номер телефону'
    const phoneRegex = /^[\d\s+\-()]+$/
    if (!phoneRegex.test(value)) return 'Невірний формат номера'
    return null
  },
  email: (value) => {
    if (!value) return null // optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Невірна email адреса'
    return null
  },
  date: (value) => {
    if (value && value < todayISO()) return 'Оберіть сьогоднішню або майбутню дату'
    if (!value) return 'Оберіть дату'
    return null
  },
  time: (value) => {
    if (!value) return 'Оберіть час'
    return null
  },
}

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](form[field])
      if (error) newErrors[field] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const setFieldValue = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
  }

  const update = (field) => (e) => {
    setFieldValue(field, e.target.value)
  }

  if (submitted) {
    return (
      <div className="page-container pb-20">
        <div className="page-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto py-20"
          >
            <div className="w-20 h-20 bg-gold-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-gold-500" size={40} />
            </div>
            <h2 className="text-3xl font-serif font-bold text-light-100 mb-4">Запит відправлено!</h2>
            <p className="text-light-400 leading-relaxed">
              Ми отримали ваш запит на бронювання. Найближчим часом з вами зв'яжеться наш менеджер для підтвердження.
            </p>
            <Button
              onClick={() => { setSubmitted(false); setForm(initialForm); setErrors({}) }}
              variant="outline"
              size="md"
              className="mt-8"
            >
              Надіслати ще один
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container pb-20">
      <div className="page-content">
        <SectionTitle subtitle="Бронювання">Забронюйте столик</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass rounded-lg p-6">
              <h3 className="label-base">Контакти</h3>
              <div className="space-y-4">
                <a href={`tel:${place.phone}`} className="flex items-center gap-3 text-sm text-light-200 hover:text-gold-500 transition-colors">
                  <Phone size={15} className="text-gold-500 shrink-0" />
                  {place.phone}
                </a>
                <a href={`mailto:${place.email}`} className="flex items-center gap-3 text-sm text-light-200 hover:text-gold-500 transition-colors">
                  <Mail size={15} className="text-gold-500 shrink-0" />
                  {place.email}
                </a>
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="label-base">Години роботи</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-light-200"><span>Пн–Чт</span><span className="font-medium">12:00 – 22:00</span></div>
                <div className="flex justify-between text-light-200"><span>Пт–Сб</span><span className="font-medium">12:00 – 23:00</span></div>
                <div className="flex justify-between text-light-200"><span>Нд</span><span className="font-medium">11:00 – 22:00</span></div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5"
          >
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
                options={[1,2,3,4,5,6,7,8,9,10].map((n) => ({
                  value: n,
                  label: `${n} ${n === 1 ? 'гість' : n < 5 ? 'гостя' : 'гостей'}`
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

            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
            >
              Відправити
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
