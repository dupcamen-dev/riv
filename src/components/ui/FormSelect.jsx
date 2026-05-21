import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useT } from '../../i18n/context.jsx'

export default function FormSelect({
  label,
  error = null,
  success = false,
  required = false,
  disabled = false,
  options = [],
  className = '',
  containerClassName = '',
  showValidation = true,
  ...props
}) {
  const t = useT()

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="label-base">
          {label}
          {required && <span className="text-gold-400">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          disabled={disabled}
          className={`input-base cursor-pointer ${error ? 'input-error' : success && showValidation ? 'input-success' : ''} ${disabled ? 'input-disabled' : ''} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option
              key={typeof option === 'object' ? option.value : option}
              value={typeof option === 'object' ? option.value : option}
              className="bg-dark-800"
            >
              {typeof option === 'object' ? option.label : option}
            </option>
          ))}
        </select>
        {showValidation && (
          <>
            {error && <AlertCircle size={18} className="error-icon absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />}
            {success && <CheckCircle2 size={18} className="success-text absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />}
          </>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
      {success && showValidation && <span className="success-text">{t('form.looks_good')}</span>}
    </div>
  )
}
