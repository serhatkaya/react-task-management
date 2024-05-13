import { cn } from '../utils/tw.util';

interface InputProps {
  onClick?: () => void;
  className?: string;
  type?: string;
  size?: 'lg' | 'md' | 'sm';
  rounded?: boolean;
  onChange;
  required?: boolean;
  placeholder?: string;
  name?: string;
  id?: string;
  value?: any;
}

const Input: React.FC<InputProps> = ({
  onClick,
  type = 'text',
  className,
  onChange,
  value,
  id,
  name,
  placeholder,
  required,
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className={cn(
          'w-full px-3 py-2 rounded border ',
          'border-gray-300 focus:border-accent',
          'focus:outline-none',
          className
        )}
        required={required} // Add the required attribute here
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
