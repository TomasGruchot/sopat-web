"use client";

type ContactMapProps = {
  lat: number;
  lon: number;
  address: string;
};

function latLonToTile(lat: number, lon: number, zoom: number) {
  const n = 2 ** zoom;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
  return { x, y, n };
}

export function ContactMap({ lat, lon, address }: ContactMapProps) {
  const zoom = 14;
  const { x: cx, y: cy } = latLonToTile(lat, lon, zoom);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // 3×3 tile mosaic centered on HQ
  const tiles: { x: number; y: number }[] = [];
  for (let row = -1; row <= 1; row++) {
    for (let col = -1; col <= 1; col++) {
      tiles.push({ x: cx + col, y: cy + row });
    }
  }

  return (
    <div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden border border-ink bg-paper-2"
        aria-label={`Otevřít mapu: ${address}`}
      >
        <div className="grid h-60 w-full grid-cols-3 grid-rows-3 md:h-72">
          {tiles.map((tile) => (
            // OSM tiles as <img> — spolehlivější než iframe embedy, které prohlížeče často blokují
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${tile.x}-${tile.y}`}
              src={`https://tile.openstreetmap.org/${zoom}/${tile.x}/${tile.y}.png`}
              alt=""
              width={256}
              height={256}
              className="h-full w-full object-cover"
              draggable={false}
            />
          ))}
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full"
        >
          <span className="relative block h-8 w-8">
            <span className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-paper bg-oxide shadow-[0_4px_12px_rgba(28,25,20,0.35)]" />
            <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-oxide" />
          </span>
        </span>

        <span className="absolute inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-paper/90 px-4 py-3 backdrop-blur-[2px] transition-colors group-hover:bg-paper">
          <span className="mono-label text-oxide">Sídlo</span>
          <span className="mt-1 block text-sm text-ink">{address}</span>
        </span>
      </a>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mono-label text-ink-soft underline decoration-line underline-offset-4 hover:text-oxide"
        >
          Otevřít v Google Maps →
        </a>
        <span className="text-[10px] text-ink-soft">© OpenStreetMap</span>
      </div>
    </div>
  );
}
