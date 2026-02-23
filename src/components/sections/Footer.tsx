"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Github, Linkedin, Coffee, Youtube, Instagram, MessageCircle } from "lucide-react";
import { GoPlus } from "react-icons/go";
import { FOOTER_NAV, SOCIALS, FOOTER_IMAGES } from "../../lib/constants";
import type { SocialLink } from "./types";

// X (Twitter) icon
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Medium Icon
const MediumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const SharpPlusIcon = ({ className }: { className?: string }) => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="55" y="10" width="10" height="100" fill="currentColor" />
    <rect x="10" y="55" width="100" height="10" fill="currentColor" />
  </svg>
);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = sectionRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        window.dispatchEvent(
          new CustomEvent("footer-visibility", {
            detail: { isVisible: entry.isIntersecting },
          })
        );
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="
        relative
        bg-transparent md:bg-[#252525]
        overflow-hidden
        font-sans
      "
    >
      {/* =========================
         FOOTER NODE SVG — Connection between Main & CTA
         ========================= */}
      <img
        src="https://cdn.prod.website-files.com/681b040781d5b5e278a69989/682231a73b5be7ff98f935ac_footer%20Node.svg"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          z-[55]
          max-w-none
          hidden md:block
          w-[22rem]
          h-[90vh]
          right-[6.5rem]
          bottom-[0]
          top-auto
        "
        style={{
          top: "auto",
          bottom: "0",
          right: "6.5rem",
          width: "23rem",
          height: "60vh",
        }}
      />

      {/* main */}
      <div className="relative bg-[#aeb3a9] max-w-[1344px] min-h-[620px] rounded-none md:rounded-tr-[60px] mt-0 md:mt-1 mr-0 md:mr-16 pt-10 md:pt-28 pb-10 md:pb-10 px-4 md:px-[5%]">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <HeroStatement />

          <div className="flex items-center justify-between mb-8 md:hidden">
            <img
              src={FOOTER_IMAGES.logo}
              alt="Weavy Artistic Intelligence"
              className="h-[32px] w-auto"
            />
            <Link
              href="/workflows"
              className="bg-[#f3fb9c] text-black py-2.5 px-7 rounded-md text-[14px] transition-all hover:scale-[1.02] active:scale-95"
            >
              START NOW
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:max-w-[80%] gap-4 md:gap-10">
              <img
                src={FOOTER_IMAGES.logo}
                alt="Weavy Artistic Intelligence"
                className="h-[40px] w-auto hidden md:block"
              />
              <p className="text-white text-[15px] leading-[1.10] font-normal max-w-[430px] opacity-65">
                <span className="font-dmsans">Weavy</span> is a new way to
                create. We&apos;re bridging the gap between AI capabilities and
                human creativity, to continue the tradition of craft in artistic
                expression. We call it Artistic Intelligence.
              </p>
            </div>
          </div>

          <div className="flex flex-col mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between max-w-[900px] gap-10">
              {/* Nav Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {FOOTER_NAV.map((column, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="text-white text-[15px] font-medium">
                      {column.title}
                    </p>
                    {column.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="text-white text-[14px] font-light hover:opacity-60"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex gap-5 mb-10 md:mb-20 justify-start md:justify-end">
                {SOCIALS.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="text-white text-lg hover:opacity-60"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon === "linkedin" && <Linkedin size={20} strokeWidth={1.5} />}
                    {social.icon === "twitter" && <XIcon />}
                    {social.icon === "youtube" && <Youtube size={20} strokeWidth={1.5} />}
                    {social.icon === "instagram" && <Instagram size={20} strokeWidth={1.5} />}
                    {social.icon === "discord" && <MessageCircle size={20} strokeWidth={1.5} />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={FOOTER_IMAGES.soc2Badge}
              alt="SOC2"
              className="w-[50px]"
            />
            <div>
              <p className="text-[#1A1A1A] text-[12px]">
                SOC 2 Type <strong>II</strong> Certified
              </p>
              <p className="text-[#1A1A1A]/70 text-[11px]">
                Your data is protected with industry-standard security controls.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-6 text-[12px] font-medium tracking-[0.05em] text-[#1A1A1A]/80">
            <span>Crafted by</span>
            <a
              href="https://github.com/yashu1412"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#111] transition-colors border-b border-black/20 hover:border-black/50"
            >
              <span>Yashpalsingh Pawara</span>
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/workflows"
        className="
          hidden md:flex
          absolute bottom-0 right-0
          bg-[#f3fb9c]
          pt-5 pb-5 pl-7 pr-14 
          rounded-tl-[25px]
          z-[60]
          transition-all duration-300
          hover:bg-white
          hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        "
      >
        <span
          className="
            text-[90px]
            font-normal
            tracking-[-0.02em]
            leading-none
            text-black
          "
        >
          Start Now
        </span>
      </Link>
    </footer>
  );
};

const HeroStatement = () => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mb-12 md:mb-32 group">
    <h2 className="text-white text-[clamp(3rem,10vw,5.5rem)] font-[500] leading-[1.05] tracking-[-0.01em] opacity-80">
      Artificial
      <br />
      Intelligence
    </h2>
    <div className="relative transition-all duration-300 group-hover:rotate-45">
      <SharpPlusIcon className="text-white w-[80px] h-[80px] md:w-[90px] md:h-[90px] transition-colors duration-300 group-hover:text-yellow-200" />
    </div>
    <h2 className="text-white text-[clamp(3rem,12vw,5.5rem)] font-[500] leading-[0.92] tracking-[-0.035em] opacity-80">
      Human
      <br />
      Creativity
    </h2>
  </div>
);

export default Footer;
