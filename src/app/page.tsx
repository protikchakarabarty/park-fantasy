"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { SectionErrorBoundary } from "@/components/section-error-boundary"
import { ViewportLazy } from "@/components/viewport-lazy"
import { FeaturedCategoriesSkeleton, BestSellingSkeleton, DefaultSectionSkeleton } from "@/components/section-skeleton"

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary" aria-label="Loading hero">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-24">
          <div className="space-y-6">
            <div className="w-56 h-9 rounded-full bg-bg-secondary animate-shimmer" />
            <div className="space-y-3">
              <div className="w-72 h-16 rounded-lg bg-bg-secondary animate-shimmer" />
              <div className="w-48 h-16 rounded-lg bg-bg-secondary animate-shimmer" />
            </div>
            <div className="w-96 h-6 rounded bg-bg-secondary animate-shimmer" />
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="w-40 h-14 rounded-full bg-bg-secondary animate-shimmer" />
              <div className="w-40 h-14 rounded-full bg-bg-secondary animate-shimmer" />
            </div>
            <div className="flex items-center gap-8 pt-8 mt-4 border-t border-glass-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="w-16 h-8 rounded bg-bg-secondary animate-shimmer" />
                  <div className="w-20 h-4 rounded bg-bg-secondary animate-shimmer" />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-bg-secondary animate-shimmer" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionSuspense({ children, skeleton }: { children: React.ReactNode; skeleton: React.ReactNode }) {
  return <Suspense fallback={skeleton}>{children}</Suspense>
}

const Navbar = dynamic(() => import("@/components/navbar").then((m) => ({ default: m.Navbar })), { ssr: false })
const Hero = dynamic(() => import("@/components/hero").then((m) => ({ default: m.Hero })), { ssr: false })
const FeaturedCategories = dynamic(() => import("@/components/featured-categories").then((m) => ({ default: m.FeaturedCategories })))
const BestSelling = dynamic(() => import("@/components/best-selling").then((m) => ({ default: m.BestSelling })))
const SpecialOffers = dynamic(() => import("@/components/special-offers").then((m) => ({ default: m.SpecialOffers })))
const ComboMeals = dynamic(() => import("@/components/combo-meals").then((m) => ({ default: m.ComboMeals })))
const RestaurantMenu = dynamic(() => import("@/components/restaurant-menu").then((m) => ({ default: m.RestaurantMenu })))
const OnlineOrderMenu = dynamic(() => import("@/components/order/online-order-menu").then((m) => ({ default: m.OnlineOrderMenu })))
const PopularDishes = dynamic(() => import("@/components/popular-dishes").then((m) => ({ default: m.PopularDishes })))
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us").then((m) => ({ default: m.WhyChooseUs })))
const About = dynamic(() => import("@/components/about").then((m) => ({ default: m.About })))
const Reviews = dynamic(() => import("@/components/reviews").then((m) => ({ default: m.Reviews })))
const Gallery = dynamic(() => import("@/components/gallery").then((m) => ({ default: m.Gallery })))
const LiveKitchen = dynamic(() => import("@/components/live-kitchen").then((m) => ({ default: m.LiveKitchen })))
const DeliveryInfo = dynamic(() => import("@/components/delivery-info").then((m) => ({ default: m.DeliveryInfo })))
const Reservation = dynamic(() => import("@/components/reservation").then((m) => ({ default: m.Reservation })))
const Contact = dynamic(() => import("@/components/contact").then((m) => ({ default: m.Contact })))
const GoogleBusiness = dynamic(() => import("@/components/google-business").then((m) => ({ default: m.GoogleBusiness })))
const FAQ = dynamic(() => import("@/components/faq").then((m) => ({ default: m.FAQ })))
const Newsletter = dynamic(() => import("@/components/newsletter").then((m) => ({ default: m.Newsletter })))
const Footer = dynamic(() => import("@/components/footer").then((m) => ({ default: m.Footer })))
const SmoothScroll = dynamic(() => import("@/lib/animations").then((m) => ({ default: m.SmoothScroll })), { ssr: false })

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<HeroSkeleton />}><Hero /></Suspense>
        <ViewportLazy><SectionErrorBoundary section="Featured Categories"><SectionSuspense skeleton={<FeaturedCategoriesSkeleton />}><FeaturedCategories /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Best Selling"><SectionSuspense skeleton={<BestSellingSkeleton />}><BestSelling /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Special Offers"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><SpecialOffers /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Combo Meals"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><ComboMeals /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Restaurant Menu"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><RestaurantMenu /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Online Order Menu"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><OnlineOrderMenu /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Popular Dishes"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><PopularDishes /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Why Choose Us"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><WhyChooseUs /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="About"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><About /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Reviews"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><Reviews /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Gallery"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><Gallery /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Live Kitchen"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><LiveKitchen /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Delivery Info"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><DeliveryInfo /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Reservation"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><Reservation /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Contact"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><Contact /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Google Business"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><GoogleBusiness /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="FAQ"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><FAQ /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
        <ViewportLazy><SectionErrorBoundary section="Newsletter"><SectionSuspense skeleton={<DefaultSectionSkeleton />}><Newsletter /></SectionSuspense></SectionErrorBoundary></ViewportLazy>
      </main>
      <ViewportLazy><Footer /></ViewportLazy>
    </SmoothScroll>
  )
}
