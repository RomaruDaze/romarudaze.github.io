interface IconProps {
  className?: string;
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.4 0 12.07c0 5.34 3.44 9.87 8.21 11.47.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.74-4.04-1.62-4.04-1.62-.55-1.4-1.34-1.78-1.34-1.78-1.09-.76.08-.74.08-.74 1.21.08 1.84 1.25 1.84 1.25 1.07 1.86 2.81 1.32 3.5 1.01.11-.79.42-1.32.76-1.62-2.67-.31-5.47-1.36-5.47-6.03 0-1.33.46-2.42 1.23-3.27-.12-.31-.53-1.55.12-3.23 0 0 1-.33 3.3 1.25a11.3 11.3 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.65 1.68.24 2.92.12 3.23.77.85 1.23 1.94 1.23 3.27 0 4.68-2.81 5.71-5.49 6.02.43.38.81 1.13.81 2.28 0 1.65-.01 2.98-.01 3.38 0 .32.21.7.83.58A12.06 12.06 0 0 0 24 12.07C24 5.4 18.63 0 12 0Z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m4 7 8 5 8-5" />
    </svg>
  );
}
