import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { StoreProvider } from "@/lib/store"
import { AuthProvider } from "@/lib/auth"
import { LoadingScreen } from "@/components/loading-screen"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
    { media: "(prefers-color-scheme: light)", color: "#FFF8E7" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://parkfantasy.com"),
  title: {
    default: "Park Fantasy | Premium Dining Experience",
    template: "%s | Park Fantasy",
  },
  description:
    "Indulge in an extraordinary culinary journey at Park Fantasy. Fine dining with premium dishes, expert chefs, and unforgettable experiences in an elegant setting.",
  keywords: [
    "restaurant",
    "fine dining",
    "park fantasy",
    "premium food",
    "culinary",
    "gourmet",
    "luxury dining",
    "reservation",
    "chef",
    "seafood",
    "steak",
    "sushi",
  ],
  authors: [{ name: "Park Fantasy" }],
  creator: "Park Fantasy",
  publisher: "Park Fantasy",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Park Fantasy",
    title: "Park Fantasy | Premium Dining Experience",
    description:
      "Indulge in an extraordinary culinary journey at Park Fantasy. Fine dining with premium dishes, expert chefs, and unforgettable experiences.",
    url: "https://parkfantasy.com",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Park Fantasy Restaurant",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification-token",
  },
  category: "restaurant",
  alternates: {
    canonical: "https://parkfantasy.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@parkfantasy",
    title: "Park Fantasy | Premium Dining Experience",
    description:
      "Indulge in an extraordinary culinary journey at Park Fantasy. Fine dining with premium dishes, expert chefs, and unforgettable experiences.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Park Fantasy",
  description: "Premium Dining Experience with world-class chefs and unforgettable flavors.",
  url: "https://parkfantasy.com",
  telephone: "01986640177",
  email: "infoparkfantasy@gmail.com",
  servesCuisine: ["Bangladeshi", "International", "Italian", "Chinese", "Grill"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jessore",
    addressRegion: "Khulna Division",
    addressCountry: "BD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.163852,
    longitude: 89.2024485,
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "16:00", closes: "22:00" },
  ],
  image: "https://parkfantasy.com/og-image.svg",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", () => {
                  navigator.serviceWorker.register("/sw.js").catch(() => {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" itemScope itemType="https://schema.org/Restaurant">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-full focus:gold-gradient-bg focus:text-inverse focus:text-sm focus:font-medium focus:shadow-lg" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", borderWidth: 0 }}>
          Skip to main content
        </a>
        <ThemeProvider>
          <AuthProvider>
            <StoreProvider>
              <LoadingScreen />
              {children}
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
