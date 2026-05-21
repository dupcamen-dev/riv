import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-gold-500 text-cream-50 hover:bg-gold-600 shadow-lg shadow-gold-500/20',
  outline: 'border border-white/15 bg-dark-900/35 text-cream-100 hover:bg-gold-500/10 hover:border-gold-400/40 hover:text-gold-300',
  ghost: 'border border-transparent text-gray-300 hover:text-cream-50 hover:bg-white/6',
  error: 'bg-gold-500 text-cream-50 hover:bg-gold-400 shadow-lg shadow-gold-500/10',
  success: 'bg-green-500 text-dark-950 hover:bg-green-400 shadow-lg shadow-green-500/10',
}

const sizes = {
  sm: 'px-4 py-2.5 text-sm min-h-10',
  md: 'px-6 py-3 text-sm min-h-11',
  lg: 'px-7 py-3.5 text-base min-h-12',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading
  const variantClass = variants[variant]
  const sizeClass = sizes[size]
  const disabledClass = isDisabled ? 'button-disabled' : ''

  const cls = `inline-flex items-center justify-center gap-2.5 font-bold tracking-normal transition-all duration-300 cursor-pointer rounded-lg focus-ring-sm ${variantClass} ${sizeClass} ${disabledClass} ${className}`

  const content = (
    <>
      {loading && <Loader2 size={16} className="loading-spinner" />}
      {children}
    </>
  )

  if (to && !isDisabled) {
    return (
      <Link to={to} className={cls} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : { scale: 1 }}
      whileTap={!isDisabled ? { scale: 0.98 } : { scale: 1 }}
      className={cls}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </motion.button>
  )
}
