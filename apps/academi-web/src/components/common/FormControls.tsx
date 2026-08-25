import React from 'react';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
        <input
          ref={ref}
          className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs transition-all focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
        {helperText && !error && <p className="text-[11px] text-slate-400">{helperText}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string | number }[];
  error?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
        <select
          ref={ref}
          className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs transition-all focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
        <textarea
          ref={ref}
          className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-xs transition-all focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
              : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-500'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
