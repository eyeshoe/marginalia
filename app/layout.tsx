import { Buenard, Caveat, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const buenard = Buenard({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-buenard',
})

const caveat = Caveat({ 
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const metadata = {
  title: 'marginalia - share music with notes',
  description: 'A music platform where you can add margin notes to your favorite songs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${buenard.variable} ${caveat.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
