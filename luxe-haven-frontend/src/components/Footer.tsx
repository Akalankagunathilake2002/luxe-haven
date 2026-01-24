"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        borderTop: "1px solid #e5d5c5",
        background: "#f7f1ea",
        color: "#4a3c2d",
      }}
    >
      {/* Top Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          // Responsive breakpoints using media queries
          // For larger screens, we'll use CSS classes or a different approach
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #b07a52 0%, #9a6643 100%)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: "1.25rem",
              }}
            >
              LH
            </div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                letterSpacing: "0.5px",
                background: "linear-gradient(135deg, #4a3c2d 0%, #b07a52 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LuxeHaven
            </div>
          </div>
          <p
            style={{
              marginTop: "1rem",
              lineHeight: 1.6,
              color: "#6b5d4a",
              fontSize: "0.95rem",
            }}
          >
            Premium real estate platform offering verified luxury properties, 
            trending locations, and personalized service for discerning clients.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1.5rem",
            }}
          >
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "1px solid #e5d5c5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b07a52",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b07a52";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#b07a52";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                title={social.charAt(0).toUpperCase() + social.slice(1)}
              >
                {social.charAt(0).toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
              color: "#4a3c2d",
            }}
          >
            Contact Info
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {[
              { icon: "📞", text: "+94 77 123 4567" },
              { icon: "✉️", text: "support@luxehaven.com" },
              { icon: "📍", text: "Colombo 03, Sri Lanka" },
              { icon: "🕒", text: "Mon - Sat: 9:00 AM - 6:00 PM" },
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  color: "#6b5d4a",
                  fontSize: "0.95rem",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
              color: "#4a3c2d",
            }}
          >
            Quick Links
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {[
              { text: "Browse Properties", href: "/properties" },
              { text: "Find Agents", href: "/agents" },
              { text: "About Company", href: "/about" },
              { text: "Contact Support", href: "/contact" },
              { text: "Privacy Policy", href: "/privacy" },
              { text: "Terms of Service", href: "/terms" },
            ].map((link, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "0.75rem",
                }}
              >
                <a
                  href={link.href}
                  style={{
                    color: "#6b5d4a",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#b07a52";
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6b5d4a";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span>→</span>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              marginBottom: "1.5rem",
              color: "#4a3c2d",
            }}
          >
            Stay Updated
          </h3>
          <p
            style={{
              marginBottom: "1.5rem",
              color: "#6b5d4a",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            Subscribe to our newsletter for the latest property listings and market insights.
          </p>
          <form
            onSubmit={handleSubscribe}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #e5d5c5",
                background: "#fff",
                color: "#4a3c2d",
                fontSize: "0.95rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#b07a52";
                e.target.style.boxShadow = "0 0 0 3px rgba(176, 122, 82, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5d5c5";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #b07a52 0%, #9a6643 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(176, 122, 82, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              Subscribe Now
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid #e5d5c5",
          padding: "1.5rem 2rem",
          background: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#6b5d4a",
              fontSize: "0.9rem",
            }}
          >
            © {new Date().getFullYear()} LuxeHaven. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              fontSize: "0.9rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="/privacy"
              style={{
                color: "#6b5d4a",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#b07a52")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b5d4a")}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={{
                color: "#6b5d4a",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#b07a52")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b5d4a")}
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              style={{
                color: "#6b5d4a",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#b07a52")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b5d4a")}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Add responsive styles via style tag */}
      <style>{`
        @media (min-width: 768px) {
          footer > div:first-child {
            grid-template-columns: repeat(2, 1fr);
          }
          footer > div:last-child > div {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            align-items: center;
          }
        }
        
        @media (min-width: 1024px) {
          footer > div:first-child {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </footer>
  );
}