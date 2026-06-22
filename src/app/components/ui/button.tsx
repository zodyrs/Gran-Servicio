import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'default';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className = '', variant, size, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
    />
  );
}
