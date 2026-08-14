"use client";

import { useEffect, useId, useRef, useState } from "react";
import { clsx } from "clsx";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  id?: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
};

export function Select({
  id,
  name,
  value,
  options,
  placeholder = "Vyberte",
  error,
  required,
  onChange,
}: SelectProps) {
  const autoId = useId();
  const fieldId = id || autoId;
  const listId = `${fieldId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);
  const display = selected?.label || placeholder;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        id={fieldId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "underline-field flex w-full items-center justify-between gap-4 border-b bg-transparent py-2.5 text-left text-base outline-none transition-colors",
          error ? "border-oxide" : open ? "border-oxide" : "border-ink hover:border-oxide",
          selected ? "text-ink" : "text-ink-soft"
        )}
      >
        <span className="truncate">{display}</span>
        <span
          aria-hidden
          className={clsx(
            "mono-label shrink-0 text-ink-soft transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          ↓
        </span>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={fieldId}
          className="absolute left-0 right-0 top-[calc(100%+2px)] z-40 max-h-[min(16rem,50dvh)] overflow-y-auto overscroll-contain border border-ink bg-paper shadow-[0_12px_32px_rgba(28,25,20,0.12)]"
        >
          {placeholder && (
            <li role="option" aria-selected={!value}>
              <button
                type="button"
                className={clsx(
                  "mono-label w-full border-b border-line px-4 py-3 text-left transition-colors",
                  !value ? "bg-paper-2 text-ink" : "text-ink-soft hover:bg-paper-2 hover:text-ink"
                )}
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                {placeholder}
              </button>
            </li>
          )}
          {options.map((option) => {
            const isActive = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={clsx(
                    "w-full border-b border-line px-4 py-3 text-left text-sm leading-snug transition-colors last:border-b-0",
                    isActive ? "bg-ink text-paper" : "text-ink hover:bg-paper-2"
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
