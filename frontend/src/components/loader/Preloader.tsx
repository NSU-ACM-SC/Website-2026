import Image from "next/image";

export function Preloader() {
  return (
    <div className="loader" role="status" aria-label="Loading page">
      <Image
        src="/assets/brand/acm-logo.webp"
        alt=""
        width={330}
        height={280}
        sizes="70px"
        style={{ width: 70, height: "auto" }}
      />
      <div className="loader-track">
        <span />
      </div>
      <span className="eyebrow">Loading the next chapter</span>
    </div>
  );
}
