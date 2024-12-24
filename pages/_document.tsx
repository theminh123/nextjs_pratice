import { NavBar } from "@/components/nav/NavBar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <NavBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
