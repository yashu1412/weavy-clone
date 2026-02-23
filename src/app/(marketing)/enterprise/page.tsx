"use client";
import { Sparkles, Hash, Globe } from "lucide-react";
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
          <div className="relative z-10 flex flex-col items-center md:pt-[-100px] justify-center text-center h-full px-6 ">

            <h1 className="text-white font-dmsans font-medium
               text-[clamp(3.5rem,9vw,5.5rem)]
              leading-tight tracking-tight">
              Turn your creative team
              <br />
              into an AI-first powerhouse
            </h1>

            <p className="mt-10 text-white/80 max-w-xl text-lg">
              Weavy enables enterprise design teams to adopt AI at scale —
              combining all your models, editing tools and workflows
              in one platform built for production.
            </p>

            <button className="mt-13 px-4 py-3 rounded-lg
              bg-[#f7ffa8] hover:bg-[#181818] hover:text-white text-black font-medium text-2xl
              hover:scale-105 transition">
              Contact Sales
            </button>
          </div>
        </section>
{/* ================= ENTERPRISE POWER ================= */}
<section className="bg-[#f7f7f0] font-dmsans">
  <div className="max-w-[1500px] mx-auto px-8 md:px-14 py-24 md:py-28">
    <h2 className="text-[28px] md:text-[30px] font-medium tracking-[-0.01em] text-[#181818]">
      Enterprise power. Creative control.
    </h2>

    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-0 md:gap-x-10">
      {/* Col 1 */}
      <div className="max-w-[450px]">
        <div className="w-12 h-12 rounded-xl bg-[#dcdcc2] flex items-center justify-center mb-8">
          <Sparkles className="w-6 h-6 text-[#181818] " />
        </div>

        <h3 className="text-[18px] font-semibold text-[#181818] mb-6">
          All your AI tools, one visual canvas
        </h3>

        <ul className="list-disc pl-5 space-y-3 text-[14px] leading-[0.9] text-black/70">
          <li>Use any model — image, video, 3D — in one place</li>
          <li>One subscription covers all models and future releases</li>
          <li>Shared credit pool across team members and months</li>
        </ul>
      </div>

      {/* Col 2 */}
      <div className="max-w-[450px]">
        <div className="w-12 h-12 rounded-xl bg-[#dcdcc2] flex items-center justify-center mb-8">
          <Hash className="w-6 h-6 text-[#181818] " />
        </div>

        <h3 className="text-[18px] font-semibold text-[#181818] mb-6">
          Production–grade creative control
        </h3>

        <ul className="list-disc pl-5 space-y-3 text-[14px] leading-[0.9] text-black/70">
          <li>Edit with layers, masks, and advanced color-grading tools</li>
          <li>Stay on-brand with scalable, reusable design systems</li>
          <li>Turn complex workflows into simple apps anyone can use</li>
        </ul>
      </div>

      {/* Col 3 */}
      <div className="max-w-[450px]">
        <div className="w-12 h-12 rounded-xl bg-[#dcdcc2] flex items-center justify-center mb-8">
          <Globe className="w-6 h-6 text-[#181818]" />
        </div>

        <h3 className="text-[18px] font-semibold text-[#181818] mb-6">
          Built for enterprise adoption
        </h3>

        <ul className="list-disc pl-5 space-y-3 text-[14px] leading-[0.9] text-black/70">
          <li>Enterprise-grade commercial rights, privacy, security, and indemnity</li>
          <li>Trace every asset back to its legal source</li>
          <li>Priority Slack support, training, and workshops for teams</li>
        </ul>
      </div>
    </div>
  </div>
</section>

        {/* ================= TRUSTED TEAMS ================= */}
        <section className="bg-white font-dmsans py-24 px-6 ">

          <div className="grid md:grid-cols-3 gap-3 max-w-8xl px-10 mx-auto items-start">
            <h2 className="text-[clamp(1.5rem,6vw,1.5rem)] font-dmsans font-semibold text-black md:text-left md:mb-16">
              Trusted by leading teams
            </h2>

            {/* Card 1 */}
            <div className="bg-[#dcdcc2] p-10 rounded-xl h-[400px] ">
              <h3 className="text-2xl font-bold mb-6">WIX</h3>
              <div className="md:pt-15">
              <p className="text-base text-black/90 leading-relaxed">
                “With our team’s rapid growth and the increasing fragmentation of AI tools, ensuring brand consistency and collaboration enhancement required new solutions. Weavy delivered a system to standardize creativity by combining pro editing control with reusable, AI-powered workflows.”
              </p>

              <p className="mt-6 text-sm font-medium">
                <span className="font-bold text-black">Niv Farchi </span> — Head of Design Guild
              </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#dcdcc2] p-10 rounded-xl h-[400px]">
              <img 
                src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/681e269cccea4176ec71284a_Etoro_logo%201.avif"
                alt="eToro"
                className="h-10 w-auto mb-6"
              />
              <div className="md:pt-19">
              <p className="text-base text-black/90 leading-relaxed">
“We were early adopters of AI in production, but managing multiple tools was slowing us down. Weavy brings every model into one powerful canvas, combining traceability and creative precision, helping us move faster without compromise.”
              </p>

              <p className="mt-6 text-sm font-normal text-[#585852]">
                <span className="font-bold text-black">Shay Chikotay </span> — Head of Creative & Content
              </p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
