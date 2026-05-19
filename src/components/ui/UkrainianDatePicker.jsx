import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const months = [
  'січень',
  'лютий',
  'березень',
  'квітень',
  'травень',
  'червень',
  'липень',
  'серпень',
  'вересень',
  'жовтень',
  'листопад',
  'грудень',
]

const monthNamesGenitive = [
  'січня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
]

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

const pad = (value) => String(value).padStart(2, '0')

const toISODate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

const fromISODate = (value) => {
  if (!value) return null

  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return null

  return new Date(year, month - 1, day)
}

const startOfToday = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

const addDays = (date, days) => {
  const next = new Date(date)
  next.setDate(date.getDate() + days)
  return next
}

const isSameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

const isBeforeDay = (date, minDate) => date < minDate

const formatDisplayDate = (value) => {
  const date = fromISODate(value)
  if (!date) return 'Оберіть дату'

  return `${date.getDate()} ${monthNamesGenitive[date.getMonth()]} ${date.getFullYear()}`
}

const getCalendarDays = (monthDate) => {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const mondayOffset = (firstDay.getDay() + 6) % 7
  const startDate = addDays(firstDay, -mondayOffset)

  return Array.from({ length: 42 }, (_, index) => addDays(startDate, index))
}

export default function UkrainianDatePicker({
  label,
  value,
  onChange,
  error = null,
  required = false,
  disabled = false,
}) {
  const selectedDate = useMemo(() => fromISODate(value), [value])
  const today = useMemo(() => startOfToday(), [])
  const [open, setOpen] = useState(false)
  const [monthDate, setMonthDate] = useState(selectedDate || today)
  const rootRef = useRef(null)

  const calendarDays = useMemo(() => getCalendarDays(monthDate), [monthDate])

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const selectDate = (date) => {
    if (disabled || isBeforeDay(date, today)) return

    onChange(toISODate(date))
    setOpen(false)
  }

  const changeMonth = (direction) => {
    setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1))
  }

  const toggleCalendar = () => {
    if (selectedDate) {
      setMonthDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    }

    setOpen((current) => !current)
  }

  return (
    <div ref={rootRef} className="relative w-full">
      {label && (
        <label className="label-base">
          <Calendar size={14} className="inline mr-1.5 -mt-0.5" />
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={toggleCalendar}
        className={`input-base flex items-center justify-between text-left ${!value ? 'text-light-400/55' : ''} ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{formatDisplayDate(value)}</span>
        <Calendar size={18} className="text-gold-500/80" />
      </button>

      {error && <span className="error-text">{error}</span>}

      {open && (
        <div
          className="absolute left-0 z-50 mt-2 w-full rounded-lg border border-white/10 bg-dark-850 p-4 shadow-2xl shadow-black/45 sm:w-[22rem]"
          role="dialog"
          aria-label="Календар вибору дати"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-light-300 transition-colors hover:border-gold-500/35 hover:text-light-100 focus-ring-sm"
              aria-label="Попередній місяць"
            >
              <ChevronLeft size={18} />
            </button>

            <p className="text-center text-sm font-bold text-light-100">
              {months[monthDate.getMonth()]} {monthDate.getFullYear()}
            </p>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-light-300 transition-colors hover:border-gold-500/35 hover:text-light-100 focus-ring-sm"
              aria-label="Наступний місяць"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-light-500">
            {weekdays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date) => {
              const isCurrentMonth = date.getMonth() === monthDate.getMonth()
              const isPast = isBeforeDay(date, today)
              const isSelected = isSameDay(date, selectedDate)
              const isToday = isSameDay(date, today)

              return (
                <button
                  key={toISODate(date)}
                  type="button"
                  disabled={isPast}
                  onClick={() => selectDate(date)}
                  className={`flex aspect-square items-center justify-center rounded-lg text-sm font-semibold transition-all focus-ring-sm ${
                    isSelected
                      ? 'bg-gold-500 text-dark-900 shadow-lg shadow-gold-500/15'
                      : isPast
                        ? 'cursor-not-allowed text-light-500/35'
                        : isToday
                          ? 'border border-gold-500/40 text-gold-300 hover:bg-gold-500/10'
                          : isCurrentMonth
                            ? 'text-light-200 hover:bg-white/8 hover:text-light-100'
                            : 'text-light-500 hover:bg-white/5'
                  }`}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => selectDate(today)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-light-300 transition-colors hover:border-gold-500/35 hover:text-light-100 focus-ring-sm"
            >
              Сьогодні
            </button>
            <button
              type="button"
              onClick={() => selectDate(addDays(today, 1))}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-light-300 transition-colors hover:border-gold-500/35 hover:text-light-100 focus-ring-sm"
            >
              Завтра
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
