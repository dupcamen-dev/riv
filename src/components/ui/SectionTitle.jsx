import { motion } from 'framer-motion'

export default function SectionTitle({ children, subtitle, dark, className = '' }) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 ${className}`}
    >
      {subtitle && (
        <p className="text-red-400 text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-bold">
          {subtitle}
        </p>
      )}
      <h2 className={`text-4xl sm:text-[2.75rem] lg:text-5xl font-display font-bold leading-[1.02] ${dark ? 'text-dark-900' : 'text-cream-50'}`}>
        {children}
      </h2>
      <div className="w-20 h-0.5 bg-red-500 mx-auto mt-5" />
    </motion.div>
  )
}