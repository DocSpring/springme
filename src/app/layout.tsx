import './globals.css'

import { Inter } from 'next/font/google'
import Header from './header'
import { ThemeProvider } from '../material-tw-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SpringMe',
  description: 'A DocSpring demo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${inter.className} h-screen align-center font-sans text-teal-50`}>
          <Header />
          <div className="h-fit w-4/5 my-4 mx-auto">{children}</div>
        </body>
      </html>
    </ThemeProvider>
  )
}
