import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NTX Devils",
  description: "North Texas Devils Australian Rules Football Club",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NTX Devils</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <header>
        <h1>NTX DEVILS FOOTY</h1>
        <div>
          <nav>
            <Link href="/rosters">Rosters</Link>
            <Link href="/schedules">Schedules</Link>
            <Link href="/info">Info/About</Link>
            <Link href="/photos">Photos</Link>
            <Link href="/sponsors">Info/About</Link>
            <Link href="/">Announcements</Link>
          </nav>
        </div>
      </header>

      <div>
        {children}
      </div>

      <footer>
        <p>&copy; Josh Pulattie 2024</p>
      </footer>

      </body>

    </html>
  );
}

//put header, nav, and footer in this layout folder
//anything that goes on ALL PAGES, goes in this layout page