import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import FormInput from '../components/ui/FormInput.jsx'
import FormTextarea from '../components/ui/FormTextarea.jsx'

const initialForm = { name: '', phone: '', message: '' }
const starLabels = ['', '1 зірка', '2 зірки', '3 зірки', '4 зірки', '5 зірок']

// Validation rules
const validationRules = {
  name: (value) => {
    if (!value.trim()) return 'Введіть ім\'я'
    if (value.trim().length < 2) return 'Ім\'я повинно мати мінімум 2 символи'
    return null
  },
  phone: (value) => {
    if (!value) return null // optional
    const phoneRegex = /^[\d\s+\-()]+$/
    if (!phoneRegex.test(value)) return 'Невірний формат номера'
    return null
  },
  message: (value) => {
    if (!value.trim()) return 'Напишіть відгук'
    if (value.trim().length < 10) return 'Відгук повинен мати мінімум 10 символів'
    return null
  },
}

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
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
    if (rating === 0) {
      newErrors.rating = 'Виберіть оцінку'
    }
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

  const update = (field) => (e) => {
    const value = e.target.value
    setForm({ ...form, [field]: value })

    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors }
      delete newErrors[field]
      setErrors(newErrors)
    }
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
            <h2 className="text-3xl font-serif font-bold text-light-100 mb-4">Дякуємо!</h2>
            <p className="text-light-400 leading-relaxed">Ваш відгук допомагає нам ставати кращими.</p>
            <Button
              onClick={() => {
                setSubmitted(false)
                setRating(0)
                setForm(initialForm)
                setErrors({})
              }}
              variant="outline"
              size="md"
              className="mt-8"
            >
              Залишити ще відгук
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container pb-20">
      <div className="page-content">
        <SectionTitle subtitle="Відгуки">Ваша думка важлива</SectionTitle>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-6"
        >
          <div className="text-center">
            <label className="label-base text-center block">
              Ваша оцінка
              <span className="text-red-400">*</span>
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hover || rating)
                return (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star)
                      // Clear rating error when user selects
                      if (errors.rating) {
                        const newErrors = { ...errors }
                        delete newErrors.rating
                        setErrors(newErrors)
                      }
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="transition-all duration-200 cursor-pointer p-1 rounded-lg focus-ring"
                    aria-label={`Оцінити на ${star} зірок`}
                    disabled={isSubmitting}
                  >
                    <Star
                      size={34}
                      className={`transition-all duration-200 ${
                        active ? 'text-gold-500 fill-gold-500' : 'text-dark-600'
                      }`}
                    />
                  </motion.button>
                )
              })}
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-gold-500 mt-3 font-medium"
              >
                {starLabels[rating]}
              </motion.p>
            )}
            {errors.rating && <span className="error-text">{errors.rating}</span>}
          </div>

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
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+380 XX XXX XXXX"
            error={errors.phone}
            disabled={isSubmitting}
            showValidation={false}
          />

          <FormTextarea
            label="Відгук"
            required
            rows={5}
            value={form.message}
            onChange={update('message')}
            placeholder="Поділіться враженнями..."
            error={errors.message}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting || rating === 0}
            className="w-full"
          >
            Надіслати відгук
          </Button>
        </motion.form>
      </div>
    </div>
  )
}
