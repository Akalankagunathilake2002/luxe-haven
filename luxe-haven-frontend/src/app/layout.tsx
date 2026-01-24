import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LuxeHaven",
  description: "Role-based real estate platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className="h-full"
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#f8fafc", // light background
          color: "#0f172a",
          margin: 0,
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />

          {/* 🔥 THIS IS THE KEY FIX */}
          <main
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem 1rem",
            }}
          >
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
