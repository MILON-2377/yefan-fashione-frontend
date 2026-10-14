"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "@/features/common/ui/button";
import { cn } from "@/lib/utils";

export interface AppButtonProps extends ButtonPrimitive.Props {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  nativeButton?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      children,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      variant = "default",
      size = "default",
      nativeButton,
      ...props
    },
    ref,
  ) => {
    // Map custom 'primary' variant to 'default' for standard buttonVariants
    const resolvedVariant = variant === "primary" ? "default" : variant;

    // Automatically set nativeButton to false if a custom 'render' element (like Link) is provided
    const resolvedNativeButton = nativeButton ?? (props.render ? false : true);

    return (
      <ButtonPrimitive
        ref={ref}
        disabled={disabled || isLoading}
        nativeButton={resolvedNativeButton}
        className={cn(
          buttonVariants({ variant: resolvedVariant, size }),
          "relative transition-all duration-200 active:scale-[0.98]",
          iconOnly && "p-2 aspect-square",
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin text-current shrink-0 mr-2"
              aria-hidden="true"
            />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="mr-1.5 inline-flex shrink-0 items-center">
                {leftIcon}
              </span>
            )}
            {!iconOnly && <span>{children}</span>}
            {iconOnly && children}
            {rightIcon && (
              <span className="ml-1.5 inline-flex shrink-0 items-center">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </ButtonPrimitive>
    );
  },
);

AppButton.displayName = "AppButton";
