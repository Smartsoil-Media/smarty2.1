import { ThemeProvider } from '@/contexts/theme-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen bg-background text-foreground">
        {children}
      </div>
    </ThemeProvider>
  )
}

