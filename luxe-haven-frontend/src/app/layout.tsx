// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          backgroundColor: "#0f172a",
          color: "#f9fafb",
          minHeight: "100vh",
        }}
      >
        <main
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "2rem 1.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            LuxeHaven
          </h1>
          {children}
        </main>
      </body>
    </html>
  );
}
