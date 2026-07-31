import React from "react";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const fieldBase =
  "w-full rounded-control bg-main-bg border-2 border-header-stroke text-body placeholder:text-secondary-text px-4 py-3 transition-colors duration-200 focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-main-bg disabled:opacity-50";

type FieldProps = {
  label?: string;
  id?: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
};

export type InputProps = FieldProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, id, error, className, wrapperClassName, ...props },
    ref
  ) {
    const inputId = id ?? props.name;
    return (
      <div className={cx("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="type-label text-secondary-text">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cx(fieldBase, error && "border-red-500", className)}
          aria-invalid={!!error}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={inputId ? `${inputId}-error` : undefined} className="type-caption text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export type TextareaProps = FieldProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, id, error, className, wrapperClassName, ...props },
    ref
  ) {
    const inputId = id ?? props.name;
    return (
      <div className={cx("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="type-label text-secondary-text">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cx(fieldBase, "resize-none min-h-[100px]", error && "border-red-500", className)}
          aria-invalid={!!error}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={inputId ? `${inputId}-error` : undefined} className="type-caption text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export type SelectProps = FieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, id, error, className, wrapperClassName, children, ...props },
    ref
  ) {
    const inputId = id ?? props.name;
    return (
      <div className={cx("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className="type-label text-secondary-text">
            {label}
          </label>
        )}
        <select
          id={inputId}
          ref={ref}
          className={cx(fieldBase, error && "border-red-500", className)}
          aria-invalid={!!error}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p id={inputId ? `${inputId}-error` : undefined} className="type-caption text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
