'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NAV_ITEMS, NAV_IMAGES } from './data';

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    const handleFooterVisibility = (e: CustomEvent<{ isVisible: boolean }>) => {
      setIsFooterVisible(e.detail.isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('footer-visibility', handleFooterVisibility as EventListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('footer-visibility', handleFooterVisibility as EventListener);
    };
  }, []);

  const navClass = isFooterVisible
    ? 'opacity-0 -translate-y-full pointer-events-none'
    : 'opacity-100 translate-y-0';

  return (
    <div
      className={`navbar_main flex flex-col w-full fixed top-0 left-0 z-[1000] bg-transparent transition-all duration-500 ${navClass}`}
    >
      <div className="flex justify-between w-full h-20 border-black/5">
        <div className="pl-0 invert">
          <Link href="/">
            <img
              src={NAV_IMAGES.logoDesktop}
              alt="Weavy Logo"
              className="h-[40px] hidden md:block"
            />
            <img
              src={NAV_IMAGES.logoMobile}
              alt="Weavy Logo"
              className="h-[30px] md:hidden"
            />
          </Link>
        </div>

        <div className="flex items-start gap-[30px] h-full">
          <nav className="hidden lg:flex items-start p-1  ">
            {NAV_ITEMS.map((link: { label: string; href?: string }) => (
              <Link
                key={link.label}
                href={link.href || '#'}
                className={`text-dmsans text-[13px] uppercase tracking-[0.06em] ${hasScrolled ? 'text-[#4b4744]' : 'text-[#4b4744]'}
                  px-4 py-2 rounded-sm transition-all duration-200
                  flex items-center justify-center
                  hover:text-white hover:bg-[#0E0E13]`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/workflows"
            className={`bg-[#f3fb9c] text-black flex items-end justify-center tracking-tight transition-all duration-300 rounded-bl-md hover:text-white hover:bg-[#202028]  ${hasScrolled
                ? 'h-[40px] px-2 text-[13px] pb-0 font-normal uppercase'
                : 'h-[90px] px-4 text-[35px] pb-0 font-normal'
              }`}
          >
            Start Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
