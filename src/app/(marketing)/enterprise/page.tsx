"use client";

import Header from "@/components/sections/Header";
import Footer from "@/components/marketing/Footer";

export default function EnterprisePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFB] selection:bg-yellow-200">
      <Header />
      <main className="flex-1">

        {/* ================= HERO VIDEO ================= */}
        <section className="font-dmsans relative h-screen w-full overflow-hidden">

          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://assets.weavy.ai/enterprise_page/enterprise_video_desktop.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">

            <h1 className="text-white font-semibold
              text-4xl md:text-6xl lg:text-7xl
              leading-tight tracking-tight">
              Turn your creative team
              <br />
              into an AI-first powerhouse
            </h1>

            <p className="mt-6 text-white/80 max-w-2xl text-lg">
              Weavy enables enterprise design teams to adopt AI at scale —
              combining all your models, editing tools and workflows
              in one platform built for production.
            </p>

            <button className="mt-8 px-6 py-3 rounded-lg
              bg-yellow-200 text-black font-medium
              hover:scale-105 transition">
              Contact Sales
            </button>
          </div>
        </section>

        {/* ================= ENTERPRISE POWER ================= */}
        <section className="bg-[#f7f7f0] font-dmsans py-24 px-6 text-center">

          <h2 className="text-lg text-black/70 mb-14">
            Enterprise power. Creative control.
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-left">

            <div>
              <h3 className="font-semibold mb-4">
                All your AI tools, one visual canvas
              </h3>
              <ul className="text-sm text-black/70 space-y-2">
                <li>• Use any model — image, video, 3D — in one place</li>
                <li>• One subscription covers all models</li>
                <li>• Shared credit pools across teams</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Production-grade creative control
              </h3>
              <ul className="text-sm text-black/70 space-y-2">
                <li>• Advanced color grading tools</li>
                <li>• Stay on-brand with reusable systems</li>
                <li>• Turn workflows into simple apps</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Built for enterprise adoption
              </h3>
              <ul className="text-sm text-black/70 space-y-2">
                <li>• Enterprise security & privacy</li>
                <li>• Asset traceability</li>
                <li>• Priority support & onboarding</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ================= TRUSTED TEAMS ================= */}
        <section className="bg-[#F5F5F5] font-dmsans py-24 px-6 ">

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            <h2 className="text-[clamp(1.5rem,6vw,1.5rem)] font-dmsans font-medium text-black md:text-left md:mb-16">
              Trusted by leading teams
            </h2>

            {/* Card 1 */}
            <div className="bg-[#dcdcc2] p-10 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">WIX</h3>

              <p className="text-sm text-black/70 leading-relaxed">
                With our team's rapid growth and increasing demand for
                collaboration, Weavy delivered a system to standardize
                creativity using AI-powered workflows.
              </p>

              <p className="mt-6 text-sm font-medium">
                Niv Farchi — Head of Design Guild
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#dcdcc2] p-10 rounded-xl">
              <img 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681e269cccea4176ec71284a_Etoro_logo%201.avif"
                alt="eToro"
                className="h-8 w-auto mb-6"
              />

              <p className="text-sm text-black/70 leading-relaxed">
                We were early adopters of AI in production but managing
                tools slowed us down. Weavy unified everything into one
                powerful creative canvas.
              </p>

              <p className="mt-6 text-sm font-medium">
                Shay Chikotay — Head of Creative & Content
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
