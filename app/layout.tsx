import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'সহজ সদাই বিডি', description: 'সহজ সদাই বিডি — প্রয়োজনীয় পণ্যের অনলাইন শপ' }
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="bn"><body>{children}</body></html>}
