import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  variant = 'glass',
  ...props
}) {
  const variantClass = variant === 'glass' ? 'glass glass-hover' : 'bg-dark-800/70 border border-white/10 rounded-lg'

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={`${variantClass} rounded-lg overflow-hidden ${padding} transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
