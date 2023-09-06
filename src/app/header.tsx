'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-blue-gray-700 px-4 h-min flex flex-row items-center justify-between">
      <h1 className="text-4xl py-4">
        <Link href="/">SpringMe</Link>
      </h1>
      <nav className="flex flex-col sm:flex-row">
        <ul className="flex flex-col sm:flex-row gap-2">
          <li>
            <Link
              href="/"
              className={`${
                pathname === '/' ? 'bg-teal-900' : ''
              } py-2 px-4 block rounded-t-md hover:bg-teal-800 focus:outline-none border-b-2 font-medium border-teal-500`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/create-template"
              className={`${
                pathname === '/create-template' ? 'bg-teal-900' : ''
              } py-2 px-4 block rounded-t-md hover:bg-teal-800 focus:outline-none border-b-2 font-medium border-teal-500`}
            >
              Create Template
            </Link>
          </li>
          <li>
            <Link
              href="/data-requests"
              className={`${
                pathname === '/data-requests' ? 'bg-teal-900' : ''
              } py-2 px-4 rounded-t-md block hover:bg-teal-800 focus:outline-none border-b-2 font-medium border-teal-500`}
            >
              Data Requests
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
