
export default function LogoMark({
  className = 'size-6.5',
}: {
  className?: string
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-md bg-primary ${className}`}
      aria-hidden
    >
      <span className="absolute top-[23%] left-[19.2%] h-[53.8%] w-[11.5%] rounded-xs bg-primary-foreground" />
      <span className="absolute top-[23%] left-[42.3%] h-[34.6%] w-[11.5%] rounded-xs bg-primary-foreground opacity-70" />
      <span className="absolute top-[23%] left-[65.4%] h-[19.2%] w-[11.5%] rounded-xs bg-primary-foreground opacity-45" />
    </div>
  )
}
