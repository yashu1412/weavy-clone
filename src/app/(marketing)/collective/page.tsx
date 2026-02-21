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
          <div className="grid grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h1 className="text-[56px] leading-tight font-medium">
                Artist Collective Program
              </h1>

              <p className="mt-6 text-[15px] text-black/70 leading-relaxed max-w-[520px]">
                A global crew of artists, designers, engineers, and filmmakers who
                don't treat AI like a hack — they treat it like clay.  
                <br /><br />
                This is the Artist Collective. Earned. Not automated.
              </p>
            </div>

            <div className="flex justify-end">
              <button className="px-8 py-3 bg-black text-white rounded-lg">
                Apply now
              </button>
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
