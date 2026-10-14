import React, { forwardRef } from "react";
import { Loader2, LucideIcon } from "lucide-react";
import {
  ACTION_VARIANTS,
  ACTION_SIZES,
  ActionVariant,
  ActionSize,
} from "@/theme/actions";

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionVariant;
  size?: ActionSize;
  isLoading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      children,
      variant = "secondary",
      size = "md",
      isLoading = false,
      loadingText,
      icon: Icon,
      iconPosition = "left",
      fullWidth = false,
      disabled,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isButtonDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        className={`
          inline-flex items-center justify-center border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none
          ${ACTION_VARIANTS[variant]}
          ${ACTION_SIZES[size]}
          ${fullWidth ? "w-full" : ""}
          ${isButtonDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "active:scale-[0.98]"}
          ${className}
          cursor-pointer
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon className="w-4 h-4 shrink-0" />
            )}
            {children && <span>{children}</span>}
            {Icon && iconPosition === "right" && (
              <Icon className="w-4 h-4 shrink-0" />
            )}
          </>
        )}
      </button>
    );
  },
);

ActionButton.displayName = "ActionButton";
