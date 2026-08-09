interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  helpText?: string;
  error?: string;
  required?: boolean;
}

export default function FormField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder = "0.00",
  helpText,
  error,
  required = true,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-rust"> *</span>}
      </label>

      <div className="relative mt-1.5">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted">
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          className={`w-full rounded-lg border bg-surface py-2.5 text-sm text-ink shadow-sm transition-colors focus:border-profit focus:ring-1 focus:ring-profit ${
            prefix ? "pl-8" : "pl-3"
          } ${suffix ? "pr-10" : "pr-3"} ${error ? "border-rust" : "border-line"}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rust">
          {error}
        </p>
      ) : helpText ? (
        <p id={`${id}-help`} className="mt-1.5 text-xs text-muted">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}
