
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex flex-1">
      <main className="flex-1">{children}</main>
    </div>
  )
}
