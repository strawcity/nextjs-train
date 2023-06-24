import "./../globals.css";
import { Jost } from "next/font/google";

const alata = Jost({ subsets: ["latin"], weight: ["400", "200"] });

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
