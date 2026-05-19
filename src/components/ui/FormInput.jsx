import { AlertCircle, CheckCircle2 } from 'lucide-react'
import UkrainianDatePicker from './UkrainianDatePicker.jsx'

export default function FormInput({
  label,
  error = null,
  success = false,
  required = false,
  disabled = false,
  icon: Icon = null,
  type = 'text',
  className = '',
  containerClassName = '',
  showValidation = true,
  ...props
}) {
  if (type === 'date') {
    return (
      <div className={`w-full ${containerClassName}`}>
        <UkrainianDatePicker
          label={label}
          required={required}
          disabled={disabled}
          value={props.value || ''}
          error={error}
          onChange={(value) => props.onChange?.({ target: { value } })}
        />
      </div>
    )
  }

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="label-base">
          {Icon && <Icon size={14} className="inline mr-1.5 -mt-0.5" />}
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          disabled={disabled}
          className={`input-base ${error ? 'input-error' : success && showValidation ? 'input-success' : ''} ${disabled ? 'input-disabled' : ''} ${className}`}
          {...props}
        />
        {showValidation && (
          <>
            {error && <AlertCircle size={18} className="error-icon absolute right-3 top-1/2 -translate-y-1/2" />}
            {success && <CheckCircle2 size={18} className="success-text absolute right-3 top-1/2 -translate-y-1/2" />}
          </>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
      {success && showValidation && <span className="success-text">Виглядає добре</span>}
    </div>
  )
}
