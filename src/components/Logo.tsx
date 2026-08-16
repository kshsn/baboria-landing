// Morse-code "B" mark: dash + three dots, per BBR-GDL-001 sec.01 geometry
// (unit = 1 dot, dash = 3u, gap = 0.5u, clearspace = 1u all sides).
const ASPECT_RATIO = 950 / 300;

export default function Logo({
  height = 28,
  surface = "dark",
}: {
  height?: number;
  surface?: "dark" | "light";
}) {
  const dotColor =
    surface === "dark" ? "var(--color-ground)" : "var(--color-baboria-navy)";

  return (
    <svg
      viewBox="-100 -100 950 300"
      width={Math.round(height * ASPECT_RATIO)}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="300" height="100" fill="var(--color-signal-orange)" />
      <rect x="350" y="0" width="100" height="100" fill={dotColor} />
      <rect x="500" y="0" width="100" height="100" fill={dotColor} />
      <rect x="650" y="0" width="100" height="100" fill={dotColor} />
    </svg>
  );
}
