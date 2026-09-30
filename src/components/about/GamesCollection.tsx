import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/case-study/parts";
import { games, type Game } from "@/data/about";
import { FavouritesNote } from "./FavouritesNote";

// GamesCollection — a curated gallery wall, not a card grid. The pieces
// hang at deliberately different sizes and offsets (placement lives in
// globals.css, .games-wall / .gw-*); Ghost of Tsushima is always the
// largest. No hover effects: the composition does the work.

function GameTile({ game, sizes, prominent }: { game: Game; sizes: string; prominent?: boolean }) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="relative overflow-hidden rounded-[4px] border border-border bg-surface"
        style={{ aspectRatio: `${game.width} / ${game.height}` }}
      >
        <Image src={game.src} alt={game.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <figcaption
        className={`font-sans tracking-tight ${
          prominent ? "text-base sm:text-lg font-medium text-foreground" : "text-sm text-muted"
        }`}
      >
        {game.title}
      </figcaption>
    </figure>
  );
}

export function GamesCollection() {
  return (
    <div className="px-6 lg:px-16 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto border-t border-border/60 pt-16 sm:pt-24">
        <div className="games-wall">
          <div className="gw-head flex flex-col gap-6">
            <Reveal>
              <SectionLabel n="04">Games</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-h1 font-sans text-foreground">Games I&apos;ve played.</h3>
            </Reveal>
            {/* Desktop: pushed right so the arrow lands beside Ghost of Tsushima */}
            <Reveal delay={0.14} className="lg:self-end lg:mt-6">
              <FavouritesNote />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="gw-ghost">
            <GameTile
              game={games.ghost}
              prominent
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 56vw, 80vw"
            />
          </Reveal>
          <Reveal delay={0.14} className="gw-f1">
            <GameTile game={games.f1} sizes="(min-width: 1024px) 170px, 30vw" />
          </Reveal>
          <Reveal delay={0.12} className="gw-gow">
            <GameTile game={games.gow} sizes="(min-width: 1024px) 270px, 55vw" />
          </Reveal>
          <Reveal delay={0.16} className="gw-phasmo">
            <GameTile game={games.phasmo} sizes="(min-width: 1024px) 170px, 40vw" />
          </Reveal>
          <Reveal delay={0.12} className="gw-cs2">
            <GameTile game={games.cs2} sizes="(min-width: 1024px) 560px, 90vw" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
