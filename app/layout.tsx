import "./../globals.css";
import { Alata } from "next/font/google";

const alata = Alata({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Catch the train",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={alata.className}>{children}</body>
    </html>
  );
}
