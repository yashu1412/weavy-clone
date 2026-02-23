'use client';

import { Artist } from '@/lib/constants';
import '@/lib/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const FooterBar = ({ artist }: { artist: Artist }) => (
  <div className="bg-white py-3 flex items-center gap-3">
    <img
      src={artist.avatar}
      alt={artist.name}
      className="w-18 h-18 rounded-md object-cover"
    />
    <div>
      <p className="text-md font-dmsans font-medium leading-tight">{artist.name}</p>
      <p className="text-[11px] uppercase tracking-[0.12em] text-black/500 font-dmsans max-w-[200px]">
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
    <div className="w-[27.759rem] h-[110vh] rounded-xl bg-[#F2FF93] flex flex-col overflow-hidden">
      {/* Top content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Actions */}
        <div className="flex items-center gap-1">
          {artist.website ? (
            <a
              href={artist.website}
              target="_blank"
              rel="noreferrer"
              className="px-1 pt-1 rounded bg-transparent text-black text-[25px] uppercase"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          ) : (
            <span className="px-1 pt-1 rounded bg-transparent text-black text-[25px] uppercase">
              <FontAwesomeIcon icon={faInstagram} />
            </span>
          )}

          {artist.linkedin ? (
            <a
              href={artist.linkedin}
              target="_blank"
              rel="noreferrer"
              className=" text-[25px] rounded bg-transparent text-black grid place-items-center font-semibold"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          ) : (
            <span className="text-[25px] rounded bg-transparent text-black grid place-items-center font-semibold">
              <FontAwesomeIcon icon={faLinkedin} />
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
          <p className="mt-2 text-[17px] font-normal leading-[0.9] font-dmsans leading-relaxed text-black/85">
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
    <div className="group relative gap-y-6">
      {/* ✅ S<FontAwesomeIcon icon={faLinkedin} />gle wrapper div for BOTH cards */}
      <div className="relative w-[27.759rem] h-[110vh] rounded-xl overflow-hidden">
        {/* ---------------- Default Card ---------------- */}
        <div
          className="
            bg-white
            transition-transform duration-200 ease-out
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