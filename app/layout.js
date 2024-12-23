import { Roboto } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const roboto = Roboto({
  variable: "--font-roboto",
  //subsets: ["latin"],
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
        className="ml-[10%] mr-[10%] bg-black text-black text-center {`${roboto.variable} antialiased`}"
      >
    
      <header className="grid grid-cols-auto grid-row-2 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 container m-auto bg-green-500">
          <h1 className="row-start-1 col-span-full font-roboto text-lg text-red-500 text-4xl">NTX DEVILS FOOTY</h1>
          <nav className="row-start-2 gap-1 col-span-6 grid cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 container m-auto">
            <Link className="tile bg-red-500" href="/rosters">Rosters</Link>
            <Link className="tile bg-red-200" href="/schedules">Schedules</Link>
            <Link className="tile bg-red-500" href="/info">Info/About</Link>
            <Link className="tile bg-red-200" href="/photos">Photos</Link>
            <Link className="tile bg-red-500" href="/sponsors">Sponsors</Link> 
            <Link className="tile bg-red-200" href="/">Announcements</Link>
          </nav>

      </header>

        <main className="text-center grid grid-cols-1 grid-row-6 row-span-6 container m-auto bg-yellow-200">
          {children}
        </main>


      <footer className="grid grid-cols-1 grid-row-6 container m-auto bg-orange-200">
        <p>&copy; Josh Pulattie 2024</p>
      </footer>

      </body>

    </html>
  );
}

//put header, nav, and footer in this layout folder
//anything that goes on ALL PAGES, goes in this layout page
