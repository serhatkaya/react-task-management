import React, { ReactNode } from 'react';
import { cn } from '../utils/tw.util';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  type?: 'primary' | 'secondary';
  size?: 'lg' | 'md' | 'sm';
  rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'primary',
  size = 'md',
  rounded,
  className,
}) => {
  const styles: any = {
    primary: [
      'text-white',
      'font-bold',
      'bg-accent',
      'active:bg-pressed',
      'hover:bg-hover',
    ],
    secondary: [
      'text-accent',
      'border-accent',
      'hover:bg-secondary',
      'bg-main border-2',
      'active:bg-pressed-secondary',
    ],
  };

  const sizeStyles: any = {
    lg: ['py-[16px]', 'px-[24px]', 'text-[19px]'],
    md: ['py-[8px]', 'px-[24px]', 'text-[16px]'],
    sm: ['py-[8px]', 'px-[16px]', 'text-[13px]'],
  };

  const defaultStyles =
    'rounded focus:outline-none focus:shadow-outline rounded-[4px]';

  const buttonStyle = styles[type] || styles['primary'];

  return (
    <button
      className={cn(
        buttonStyle,
        sizeStyles[size],
        defaultStyles,
        rounded && 'rounded-[50px]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;