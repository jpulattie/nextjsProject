import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400","700"]
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400","700"]

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
        <meta name="description" content="NTX Aussie Rules Football Club" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} antialiased`}
      >
      <header>
        <h1 className="flex items-center justify-center h-screen font-robotoSlab text-lg text-red-500 text-4xl">NTX DEVILS FOOTY</h1>
        <div>
          <nav class="flex items-center justify-center h-screen">
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
