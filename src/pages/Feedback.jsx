import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import Button from '../components/ui/Button.jsx'
import FormInput from '../components/ui/FormInput.jsx'
import FormTextarea from '../components/ui/FormTextarea.jsx'
import { useT } from '../i18n/context.jsx'

const initialForm = { name: '', phone: '', message: '' }

export default function Feedback({ light }) {
  const t = useT()
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const starLabels = ['', t('feedback.star_1'), t('feedback.star_2'), t('feedback.star_3'), t('feedback.star_4'), t('feedback.star_5')]

  const validationRules = {
    name: (value) => {
      if (!value.trim()) return t('feedback.err_name')
      if (value.trim().length < 2) return t('feedback.err_name_min')
      return null
    },
    phone: (value) => {
      if (!value) return null
      const phoneRegex = /^[\d\s+\-()]+$/
      if (!phoneRegex.test(value)) return t('feedback.err_phone')
      return null
    },
    message: (value) => {
      if (!value.trim()) return t('feedback.err_review')
      if (value.trim().length < 10) return t('feedback.err_review_min')
      return null
    },
  }

  const validate = () => {
    const newErrors = {}
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](form[field])
      if (error) newErrors[field] = error
    })
    if (rating === 0) {
      newErrors.rating = t('feedback.err_rating')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const update = (field) => (e) => {
    const value = e.target.value
    setForm({ ...form, [field]: value })

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
            <div className="w-20 h-20 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-red-400" size={40} />
            </div>
            <h2 className={`text-3xl font-display font-bold mb-4 ${light ? 'text-dark-900' : 'text-cream-50'}`}>{t('feedback.thanks')}</h2>
            <p className={`leading-relaxed ${light ? 'text-gray-600' : 'text-gray-400'}`}>{t('feedback.thanks_text')}</p>
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
              {t('feedback.write_another')}
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container pb-20">
      <div className="page-content">
        <SectionTitle subtitle={t('feedback.subtitle')} dark={light}>{t('feedback.title')}</SectionTitle>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`max-w-lg mx-auto space-y-6 ${light ? 'feedback-form-light' : ''}`}
        >
          <div className="text-center">
            <label className="label-base text-center block">
              {t('feedback.rating')}
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
                    aria-label={t('feedback.rating_aria', { star })}
                    disabled={isSubmitting}
                  >
                    <Star
                      size={34}
                      className={`transition-all duration-200 ${
                        active ? 'text-red-500 fill-red-500' : 'text-dark-600'
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
                className="text-xs text-red-400 mt-3 font-medium"
              >
                {starLabels[rating]}
              </motion.p>
            )}
            {errors.rating && <span className="error-text">{errors.rating}</span>}
          </div>

          <FormInput
            label={t('feedback.name')}
            required
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder={t('feedback.name_placeholder')}
            error={errors.name}
            disabled={isSubmitting}
          />

          <FormInput
            label={t('feedback.phone')}
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+380 XX XXX XXXX"
            error={errors.phone}
            disabled={isSubmitting}
            showValidation={false}
          />

          <FormTextarea
            label={t('feedback.review')}
            required
            rows={5}
            value={form.message}
            onChange={update('message')}
            placeholder={t('feedback.review_placeholder')}
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
            {t('feedback.submit')}
          </Button>
        </motion.form>
      </div>
    </div>
  )
}
