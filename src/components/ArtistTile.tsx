'use client';

import { Artist } from '@/lib/constants';

const FooterBar = ({ artist }: { artist: Artist }) => (
  <div className="bg-white px-4 py-3 flex items-center gap-3">
    <img
      src={artist.avatar}
      alt={artist.name}
      className="w-9 h-9 rounded-full object-cover"
    />
    <div>
      <p className="text-sm font-medium leading-tight">{artist.name}</p>
      <p className="text-[11px] uppercase tracking-[0.12em] text-black/50">
        {artist.role}
      </p>
    </div>
  </div>
);

const HoverCard = ({ artist }: { artist: Artist }) => (
  <div
    className="
      absolute inset-0 z-20
      opacity-0 pointer-events-none
      group-hover:opacity-100 group-hover:pointer-events-auto
      transition-all duration-200 ease-out
    "
  >
    <div className="w-[27.759rem] h-[100vh] rounded-xl bg-[#F2FF93] flex flex-col overflow-hidden">
      {/* Top content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Actions */}
        <div className="flex items-center gap-2">
          {artist.website ? (
            <a
              href={artist.website}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 rounded bg-black text-white text-[11px] uppercase"
            >
              Website
            </a>
          ) : (
            <span className="px-3 py-1 rounded bg-black/20 text-black/60 text-[11px] uppercase">
              Website
            </span>
          )}

          {artist.linkedin ? (
            <a
              href={artist.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded bg-black text-white grid place-items-center font-semibold"
            >
              in
            </a>
          ) : (
            <span className="w-8 h-8 rounded bg-black/20 text-black/60 grid place-items-center font-semibold">
              in
            </span>
          )}
        </div>

        {/* Small image */}
        <div className="mt-4 flex justify-end">
          <img
            src={artist.heroImage}
            alt={`${artist.name} preview`}
            className="w-[150px] h-[150px] rounded-xl object-cover shadow-sm"
          />
        </div>

        {/* Bio */}
        <div className="mt-auto">
          <p className="text-[11px] uppercase tracking-[0.12em] text-black/60">
            Artist Bio
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-black/85">
            {artist.bio ?? '—'}
          </p>
        </div>
      </div>

      {/* footer on hover */}
      <FooterBar artist={artist} />
    </div>
  </div>
);

export default function ArtistTile({ artist }: { artist: Artist }) {
  return (
    <div className="group relative gap-y-4">
      {/* ✅ Single wrapper div for BOTH cards */}
      <div className="relative w-[27.759rem] h-[100vh] rounded-xl overflow-hidden">
        {/* ---------------- Default Card ---------------- */}
        <div
          className="
            bg-white
            transition-transform duration-200 ease-out
            group-hover:scale-[0.985]
          "
        >
          <img
            src={artist.heroImage}
            alt={artist.name}
            className="object-cover w-full h-full"
          />
          {/* default footer */}
          <FooterBar artist={artist} />
        </div>

        {/* ---------------- Hover Card ---------------- */}
        <HoverCard artist={artist} />
      </div>
    </div>
  );
}