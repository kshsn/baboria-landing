export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/logo-mark.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
