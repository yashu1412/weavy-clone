import Header from "@/components/sections/Header";
import Footer from "@/components/marketing/Footer";
import { ARTISTS } from '@/lib/constants';
import ArtistTile from '@/components/ArtistTile';

export default function CollectivePage() {
  return (
    <div className="font-dmsans min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1600px] mx-auto px-20 py-24">
          {/* Header */}
<div className="mb-32">
  {/* Row 1: Title */}
  <h1 className="font-dmsans text-[clamp(3.5rem,9vw,5.5rem)] font-normal leading-[1.05] font-medium tracking-tight max-w-[1100px]">
    Artist Collective Program
  </h1>

  {/* Row 2: Description + CTA */}
  <div className="mt-10 grid grid-cols-12 items-start ">
    {/* Left text */}
    <div className="col-span-7 ">
      <p className="text-[18px] text-black/500 font-dmsans leading-[1.1] max-w-[610px]">
        A global crew of artists, designers, engineers, and filmmakers who don’t
        treat AI like a hack – they treat it like clay, its messy, powerful, and
        meant to be molded.
        <br />
        This collective lives in the guts of it all – the process, the craft,
        the “what if I break it?” moments. They’re not just using Weavy – they’re
        shaping it.
        <br /><br />
        <span className="text-black">
          This is the Artist Collective. Earned. Not automated.
        </span>
      </p>
    </div>

    {/* Right CTA */}
    <div className="col-span-5 flex justify-end">
      <button className="px-7 md:pl-60 py-2 bg-[#1f1f1f] md:mt-20 text-white text-[32px] font-medium font-dmsans rounded-lg hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all">
        Apply now
      </button>
    </div>
  </div>
</div>

          {/* Masonry-style grid */}
          <section className="grid grid-cols-3 justify-items-center gap-y-8 ">
            {ARTISTS.map((artist) => (
              <ArtistTile key={artist.id} artist={artist} />
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
