import { Roboto } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from "next/image";


const roboto = Roboto({
  variable: "--font-roboto",
  //subsets: ["latin"],
  weight: ["400","700"]
});


export const metadata = {
  title: "MOKCU",
  description: "MOK Credit Union",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>MOKCU Online Banking</title>
        <meta name="description" content="MOK Credit Union Online Banking" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="ml-[10%] mr-[10%] bg-white text-myrtleGreen text-center {`${roboto.variable} antialiased`}"
      >
    
      <header className="grid grid-row-2 gap-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 container m-auto bg-myrtleGreen text-primroseYellow">
          <div className="col-span-1 sm:col-span-6 md:col-span-6 lg:col-span-6 flex justify-between items-center bg-myrtleGreen text-primroseYellow">

            
            <Link href="/" className="col-span-6 font-roboto text-lg text-4.5xl bg-myrtleGreen text-primroseYellow text-center">
              <h1>MOK Credit Union Online Banking</h1>
            </Link>

          </div>
          <nav className="row-start-2 gap-1 col-span-6 grid cols-1 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 container m-auto bg-primroseYellow text-myrtleGreen text-base">
            <Link className="col-span-2" href="/rosters">View Accounts</Link>
            <Link className="col-span-2" href="/schedules">Transfer Funds</Link>
            <Link className="col-span-2" href="/">Logout</Link>

          </nav>

      </header>

        <main className="text-center grid grid-cols-1 grid-row-6 row-span-6 container m-auto bg-white text-myrtleGreen">
          {children}
        </main>


      <footer className="grid grid-cols-1 grid-row-6 container m-auto bg-myrtleGreen text-primroseYellow">
        <p>&copy; Josh Pulattie 2024</p>
      </footer>

      </body>

    </html>
  );
}

//put header, nav, and footer in this layout folder
//anything that goes on ALL PAGES, goes in this layout page
