"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/features/common/ui/button";
import { cn } from "@/lib/utils";

export interface AppButtonProps extends React.ComponentPropsWithRef<typeof Button> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn("relative transition-all duration-200 active:scale-[0.98]", className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex shrink-0 items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex shrink-0 items-center">{rightIcon}</span>
        )}

      </Button>
    );
  }
);

AppButton.displayName = "AppButton";
