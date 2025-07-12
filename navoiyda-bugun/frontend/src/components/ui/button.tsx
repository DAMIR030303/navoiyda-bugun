import React from "react";
import { cn } from "../../utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "gradient"
    | "success"
    | "warning"
    | "premium";
  size?: "default" | "sm" | "lg" | "icon" | "xl";
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      default:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
      outline:
        "border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200",
      ghost:
        "hover:bg-gray-100 hover:text-gray-900 hover:shadow-md transition-all duration-200",
      link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 transition-colors duration-200",
      gradient:
        "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
      success:
        "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
      warning:
        "bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200",
      premium:
        "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 animate-pulse",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-base",
      xl: "h-14 px-10 text-lg",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden",
          variants[variant],
          sizes[size],
          loading && "cursor-not-allowed",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {leftIcon && !loading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}

        <span className={cn(loading && "opacity-50")}>{children}</span>

        {rightIcon && !loading && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
