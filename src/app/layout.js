import "./globals.css";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "OtakuVerse",
  description: "Community-driven anime posts and discussions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="text-gray-900 bg-white">
        <NavBar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
