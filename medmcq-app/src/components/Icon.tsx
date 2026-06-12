interface IconProps {
  path: string
  className?: string
}

/** Minimal stroke-style icon renderer for the SVG path data in specialties.ts */
export function Icon({ path, className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  )
}
