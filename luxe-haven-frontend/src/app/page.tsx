"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "admin" | "seller" | "buyer";
  };
  dashboardPath: string;
}

type TrendingPlace = {
  name: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
};

type Review = {
  name: string;
  role: string;
  rating: number;
  quote: string;
};

type Award = {
  year: string;
  title: string;
  org: string;
  desc: string;
};

type SlideCard = {
  title: string;
  subtitle: string;
  imageUrl: string;
  cta: string;
};

function Placeholder({ label }: { label: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#efe6dd] to-[#e0d4c7] px-4 text-center">
      <div>
        <div className="text-sm font-extrabold text-black/65">{label}</div>
        <div className="mt-1 text-xs text-black/55">Paste your URL / add your file in /public.</div>
      </div>
    </div>
  );
}

export default function Page() {
  const router = useRouter();

  /* =========================================================
   ✅ HERO VIDEO CONFIG
  ========================================================= */
  // Put your video at: public/videos/hero.mp4
  // Optional: public/videos/hero.webm for better performance.
  const heroVideoMp4 = "/videos/hero.mp4";
  const heroVideoWebm = "/videos/hero.webm"; // optional (if you have)
  const heroFallbackImage =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Try to autoplay (some browsers may block if not muted — we are muted)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked in rare cases
        setIsPlaying(false);
      }
    };

    tryPlay();
  }, []);

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  /* =========================================================
   ✅ TRENDING / REVIEWS / AWARDS / SLIDES (unchanged)
  ========================================================= */
  const trendingPlaces: TrendingPlace[] = [
    {
      name: "Colombo 07",
      subtitle: "Luxury apartments • Prime location",
      badge: "Trending",
      imageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Rajagiriya",
      subtitle: "Family homes • High demand",
      badge: "Hot Rentals",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Negombo",
      subtitle: "Beachside living • Investment",
      badge: "Coastal",
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Kandy City",
      subtitle: "Calm lifestyle • Great views",
      badge: "Lifestyle",
      imageUrl:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const reviews: Review[] = [
    {
      name: "Amara S.",
      role: "Buyer",
      rating: 5,
      quote: "The experience felt premium from start to finish. The property suggestions were perfect.",
    },
    {
      name: "Kavindu R.",
      role: "Seller",
      rating: 5,
      quote: "My listing got serious leads quickly. The dashboard is clean, fast, and easy to manage.",
    },
    {
      name: "Nethmi P.",
      role: "Investor",
      rating: 4,
      quote: "Trending locations and pricing insights helped me choose the right area with confidence.",
    },
  ];

  const awards: Award[] = [
    {
      year: "2025",
      title: "Best Premium Property Platform",
      org: "Regional Property Awards",
      desc: "Recognized for premium experience, verified listings, and a clean user journey.",
    },
    {
      year: "2024",
      title: "Top Customer Experience (CX)",
      org: "Digital Experience Council",
      desc: "High satisfaction from buyers and sellers across web and mobile.",
    },
    {
      year: "2023",
      title: "Innovation in Property Search",
      org: "PropTech Summit",
      desc: "Awarded for modern discovery, filters, and location insights.",
    },
  ];

  const slideCards: SlideCard[] = [
    {
      title: "Modern Villas",
      subtitle: "Quiet neighborhoods • premium finishes",
      imageUrl:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cta: "Explore villas",
    },
    {
      title: "City Apartments",
      subtitle: "Walkable areas • skyline views",
      imageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cta: "Explore apartments",
    },
    {
      title: "Family Homes",
      subtitle: "Spacious • near schools",
      imageUrl:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cta: "Explore homes",
    },
    {
      title: "Coastal Living",
      subtitle: "Beachfront • investment-ready",
      imageUrl:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      cta: "Explore coastal",
    },
  ];

  /* =========================================================
   ✅ SIGN-IN/SIGN-UP ALERT
  ========================================================= */
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!alertShown) {
        setShowAuthAlert(true);
        setAlertShown(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [alertShown]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAlertShown(true);
  }, []);

  /* ---------------- HORIZONTAL SLIDER ---------------- */
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  function scrollCards(dir: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(560, el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  /* ---------------- SIGN-IN MODAL ---------------- */
  const [openAuth, setOpenAuth] = useState(false);
  const [email, setEmail] = useState("admin1@example.com");
  const [password, setPassword] = useState("Admin123!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiRequest<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      const path =
        data.user.role === "admin"
          ? "/dashboard/admin"
          : data.user.role === "seller"
          ? "/dashboard/seller"
          : "/dashboard/buyer";

      setOpenAuth(false);
      setShowAuthAlert(false);
      router.push(path);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f1ea] to-white text-[#1b1b1b]">
      {/* SIGN-IN/SIGN-UP ALERT */}
      {showAuthAlert && (
        <div className="fixed top-20 left-1/2 z-[9999] -translate-x-1/2 animate-fade-in-down">
          <div className="rounded-2xl bg-gradient-to-r from-[#b07a52] to-[#9a6643] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-white/20 p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="font-extrabold">Unlock Premium Features!</div>
                  <div className="text-sm opacity-90">Sign in to save properties, get personalized recommendations</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAuthAlert(false);
                    setOpenAuth(true);
                  }}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#b07a52] transition-all hover:scale-105"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowAuthAlert(false);
                    router.push("/signup");
                  }}
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Sign Up
                </button>
                <button onClick={() => setShowAuthAlert(false)} className="rounded-full p-2 text-white/70 hover:bg-white/10">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO WITH VIDEO */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden pt-16">
        {/* Video Background */}
        <div className="absolute inset-0">
          {!videoError ? (
            <>
              {/* Fallback image while loading */}
              {!videoReady && (
                <img
                  src={heroFallbackImage}
                  alt="Hero fallback"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  videoReady ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onCanPlay={() => setVideoReady(true)}
                onError={() => setVideoError(true)}
              >
                {/* Optional webm first */}
                <source src={heroVideoWebm} type="video/webm" />
                <source src={heroVideoMp4} type="video/mp4" />
              </video>

              {/* Readability overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </>
          ) : (
            <Placeholder label="HERO VIDEO ERROR (check /public/videos/hero.mp4)" />
          )}
        </div>

        {/* Hero Content */}
        <div className="relative mx-auto flex h-full w-[min(1400px,94%)] items-center">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#b07a52]" />
              <span className="text-sm font-semibold tracking-widest">PREMIUM REAL ESTATE</span>
            </div>

           

            <p className="mt-6 max-w-xl text-xl leading-relaxed text-white/90">
              Experience curated luxury properties, verified listings, and personalized service designed for the most discerning buyers and sellers.
            </p>

           

            {/* Hero Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-extrabold">500+</div>
                <div className="mt-2 text-sm text-white/70">Premium Properties</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold">98%</div>
                <div className="mt-2 text-sm text-white/70">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold">25+</div>
                <div className="mt-2 text-sm text-white/70">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="absolute bottom-10 right-10 z-[10]">
          <button
            onClick={toggleVideo}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            {isPlaying ? "Pause video" : "Play video"}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="h-8 w-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* MAIN CONTENT (unchanged from your layout) */}
      <main className="mx-auto w-[min(1400px,94%)] py-20">
        {/* Trending Section */}
        <section id="trending" className="mb-20 scroll-mt-20">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-extrabold tracking-tight">Trending Locations</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/60">
              Discover the most sought-after neighborhoods with premium amenities and high investment potential.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {trendingPlaces.map((t) => (
              <div
                key={t.name}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl"
              >
                <div className="relative h-64 overflow-hidden">
                  {t.imageUrl.includes("PASTE_") ? (
                    <Placeholder label={`TRENDING: ${t.name}`} />
                  ) : (
                    <>
                      <img
                        src={t.imageUrl}
                        alt={t.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-gradient-to-r from-[#b07a52] to-[#9a6643] px-4 py-1.5 text-xs font-extrabold text-white">
                          {t.badge}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-extrabold">{t.name}</h3>
                  <p className="mt-2 text-sm text-black/60">{t.subtitle}</p>
                  <button
                    onClick={() => router.push(`/properties?location=${t.name.toLowerCase()}`)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b07a52] transition-all hover:gap-3"
                  >
                    Explore Properties
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mb-20 rounded-4xl bg-gradient-to-br from-white to-[#fff7ef] p-12 shadow-2xl">
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold tracking-tight">What Our Clients Say</h2>
            <p className="mt-4 text-lg text-black/60">
              Join thousands of satisfied clients who found their dream property with us.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="group rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold">{r.name}</div>
                    <div className="text-sm font-semibold text-black/50">{r.role}</div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${i < r.rating ? "text-[#b07a52]" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-black/70">"{r.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="text-5xl font-extrabold tracking-tight">Award Winning Excellence</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/60">
              Recognized for innovation, customer experience, and industry leadership.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {awards.map((a) => (
              <div
                key={a.title}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#fff7ef] p-8 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                <div className="absolute right-4 top-4 text-6xl font-extrabold text-[#b07a52]/10">{a.year}</div>
                <div className="relative">
                  <div className="mb-4 text-sm font-bold tracking-widest text-[#b07a52]">{a.year}</div>
                  <h3 className="mb-3 text-2xl font-extrabold">{a.title}</h3>
                  <div className="mb-4 text-lg font-semibold text-black/70">{a.org}</div>
                  <p className="text-black/60">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Collections Slider */}
        <section className="mb-20">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-5xl font-extrabold tracking-tight">Featured Collections</h2>
              <p className="mt-4 text-lg text-black/60">Curated property collections for every lifestyle and preference.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => scrollCards("left")}
                className="rounded-full border border-black/10 bg-white p-3 transition-all hover:scale-110 hover:bg-black/[0.03]"
                aria-label="Scroll left"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollCards("right")}
                className="rounded-full border border-black/10 bg-white p-3 transition-all hover:scale-110 hover:bg-black/[0.03]"
                aria-label="Scroll right"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slideCards.map((c) => (
              <div
                key={c.title}
                className="group min-w-[400px] flex-1 overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="relative h-72 overflow-hidden">
                  {c.imageUrl.includes("PASTE_") ? (
                    <Placeholder label={`COLLECTION: ${c.title}`} />
                  ) : (
                    <>
                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-2xl font-extrabold">{c.title}</h3>
                        <p className="mt-2 text-sm opacity-90">{c.subtitle}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6">
                  <button
                    onClick={() => router.push("/properties")}
                    className="group flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#b07a52] to-[#9a6643] px-6 py-4 text-white transition-all hover:shadow-lg"
                  >
                    <span className="text-lg font-extrabold">{c.cta}</span>
                    <svg className="h-5 w-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-4xl bg-gradient-to-br from-[#1b1b1b] to-black p-16 text-center text-white">
          <h2 className="text-5xl font-extrabold tracking-tight">Ready to Find Your Dream Property?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/70">
            Join thousands of satisfied clients and experience premium real estate service.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <button
              onClick={() => router.push("/properties")}
              className="rounded-full bg-gradient-to-r from-[#b07a52] to-[#9a6643] px-10 py-5 text-lg font-extrabold text-white transition-all hover:scale-105 hover:shadow-2xl"
            >
              Browse Properties
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="rounded-full border-2 border-white/30 bg-white/10 px-10 py-5 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Agent
            </button>
          </div>
        </section>
      </main>

      {/* ENHANCED SIGN-IN MODAL */}
      {openAuth && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8 text-center">
              <div className="text-3xl font-extrabold">Welcome Back</div>
              <div className="mt-2 text-black/60">Access your dashboard and continue your journey</div>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-extrabold">Email Address</label>
                <input
                  className="h-14 w-full rounded-2xl border border-black/10 bg-[#fbf7f2] px-6 text-lg outline-none transition-all focus:border-[#b07a52] focus:ring-2 focus:ring-[#b07a52]/20"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-extrabold">Password</label>
                <input
                  className="h-14 w-full rounded-2xl border border-black/10 bg-[#fbf7f2] px-6 text-lg outline-none transition-all focus:border-[#b07a52] focus:ring-2 focus:ring-[#b07a52]/20"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <button
                disabled={loading}
                className="h-14 w-full rounded-2xl bg-gradient-to-r from-[#b07a52] to-[#9a6643] text-lg font-extrabold text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Signing In...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-black/60 underline underline-offset-4 transition-all hover:text-[#b07a52]"
                >
                  Don't have an account? Sign up here
                </button>
              </div>
            </form>

            <button
              className="absolute right-4 top-4 rounded-full p-2 text-black/40 transition-all hover:bg-black/5 hover:text-black"
              onClick={() => {
                setOpenAuth(false);
                setError(null);
              }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
