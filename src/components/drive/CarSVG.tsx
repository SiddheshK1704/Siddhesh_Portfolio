/**
 * A low, faceted sports-coupe silhouette rendered as a technical
 * line drawing rather than a "cute icon." Deliberately geometric
 * (straight segments, not hand-drawn curves) — that's an honest
 * illustration style choice, not a shortcut, and it suits the
 * blueprint/schematic framing of the section around it.
 *
 * No props: this component is purely presentational. All animation
 * targets the .js-* classes below via GSAP selectors scoped from
 * the parent DriveSection (see useGSAP's `scope` option there) —
 * simpler than threading refs or MotionValues through props.
 *
 * Wheel wells are genuine cutouts: a background-colored circle is
 * drawn on top of the body silhouette (punching a "hole" in it),
 * THEN the actual wheel graphic is drawn inside that hole. This is
 * what makes the wheels look socketed into the body instead of
 * pasted below its edge.
 */
export function CarSVG() {
  const REAR_WHEEL_X = 118;
  const FRONT_WHEEL_X = 382;
  const WHEEL_Y = 148;
  const CUTOUT_R = 34;
  const WHEEL_R = 28;
  const SPOKE_ANGLES = [0, 72, 144, 216, 288];

  function Wheel({ cx }: { cx: number }) {
    return (
      <g className="js-wheel" style={{ transformOrigin: `${cx}px ${WHEEL_Y}px` }}>
        <circle cx={cx} cy={WHEEL_Y} r={WHEEL_R} fill="var(--color-background)" stroke="var(--color-foreground)" strokeWidth={3} />
        <circle cx={cx} cy={WHEEL_Y} r={8} fill="var(--color-foreground)" />
        {SPOKE_ANGLES.map((deg) => (
          <line
            key={deg}
            x1={cx}
            y1={WHEEL_Y}
            x2={cx + 17 * Math.cos((deg * Math.PI) / 180)}
            y2={WHEEL_Y + 17 * Math.sin((deg * Math.PI) / 180)}
            stroke="var(--color-foreground)"
            strokeWidth={2.5}
          />
        ))}
      </g>
    );
  }

  return (
    <svg viewBox="0 0 500 180" width={340} height={122} className="overflow-visible" aria-hidden>
      {/* Underglow, sits behind everything */}
      <ellipse className="js-underglow" cx={248} cy={152} rx={195} ry={7} fill="var(--color-accent)" filter="blur(9px)" opacity={0} />

      {/* Body silhouette — a single closed polygon, low and wide */}
      <path
        d="M46,148 L46,128 L64,112 L98,102 L136,52 L188,36 L258,36 L300,54 L333,80 L408,92 L436,114 L450,136 L450,148 Z"
        fill="var(--color-foreground)"
      />

      {/* Character line + tinted glass band, layered on top of the body fill */}
      <path d="M70,118 L400,94" stroke="var(--color-accent)" strokeWidth={2} opacity={0.5} />
      <path d="M142,50 L184,40 L252,40 L292,52 L280,58 L160,58 Z" fill="var(--color-background)" opacity={0.85} />

      {/* Wheel-arch cutouts — background-colored, sits on top of the
          body fill to visually "punch through" it */}
      <circle cx={REAR_WHEEL_X} cy={WHEEL_Y} r={CUTOUT_R} fill="var(--color-background)" />
      <circle cx={FRONT_WHEEL_X} cy={WHEEL_Y} r={CUTOUT_R} fill="var(--color-background)" />

      {/* Actual wheel graphics, drawn inside the cutouts */}
      <Wheel cx={REAR_WHEEL_X} />
      <Wheel cx={FRONT_WHEEL_X} />

      {/* Headlight */}
      <circle className="js-headlight-glow" cx={444} cy={108} r={10} fill="var(--color-accent)" filter="blur(7px)" opacity={0} />
      <circle className="js-headlight-core" cx={444} cy={108} r={4} fill="var(--color-accent)" opacity={0} />
    </svg>
  );
}
