import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`p-4 flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <h4>首页</h4>
      <ul className="mt-8">
        <li>
          <Link href={'/posts'}>post列表页</Link>
        </li>
        <li className="mt-2">
          <Link href={'/about'}>about</Link>
        </li>
      </ul>
    </main>
  )
}
