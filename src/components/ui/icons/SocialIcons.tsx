import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function WhatsAppIcon({
  size = 20,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a0.5.5 0 0 0 1 0V9a0.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a0.5.5 0 0 0 0-1h-1a0.5.5 0 0 0 0 1" />
    </svg>
  );
}

export function WeChatIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M8.5 3C4.36 3 1 5.91 1 9.5c0 2.05 1.08 3.87 2.78 5.09L3 17.5l3.39-1.29c.68.18 1.39.29 2.11.29.23 0 .46-.01.69-.03a6.83 6.83 0 0 1-.19-1.57c0-3.87 3.58-7 8-7 1.04 0 2.03.18 2.93.5C19.04 5.04 14.28 3 8.5 3zm-2.25 4c.69 0 1.25.56 1.25 1.25S6.94 9.5 6.25 9.5 5 8.94 5 8.25 5.56 7 6.25 7zm4.5 0c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25S9.5 8.94 9.5 8.25 10.06 7 10.75 7zM16 9c-3.87 0-7 2.69-7 6s3.13 6 7 6c.64 0 1.27-.08 1.88-.24L21 22l-.78-2.33C21.37 18.5 22 17.06 22 15c0-3.31-3.13-6-7-6zm-2 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
    </svg>
  );
}

export function FacebookIcon({
  size = 20,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({
  size = 20,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function LinkedinIcon({
  size = 20,
  className = "",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
