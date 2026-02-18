import type { Metadata } from 'next'
import './globals.css'
import { ProjectProvider } from './contexts/ProjectContext'

export const metadata: Metadata = {
  title: 'PakSpecialist',
  description: 'PakSpecialist - Technical Brief Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <ProjectProvider>{children}</ProjectProvider>
      </body>
    </html>
  )
}

