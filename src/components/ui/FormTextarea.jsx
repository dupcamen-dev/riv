import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function FormTextarea({
  label,
  error = null,
  success = false,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  showValidation = true,
  ...props
}) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="label-base">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          disabled={disabled}
          className={`input-base resize-none ${error ? 'input-error' : success && showValidation ? 'input-success' : ''} ${disabled ? 'input-disabled' : ''} ${className}`}
          {...props}
        />
        {showValidation && (
          <>
            {error && <AlertCircle size={18} className="error-icon absolute right-3 top-3" />}
            {success && <CheckCircle2 size={18} className="success-text absolute right-3 top-3" />}
          </>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
      {success && showValidation && <span className="success-text">Виглядає добре</span>}
    </div>
  )
}
