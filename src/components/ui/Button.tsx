import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      className={`py-2 px-6 rounded-md text-white ${width} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
