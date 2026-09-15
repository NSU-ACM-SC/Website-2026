import Link from "next/link";
export default function NotFound() {
  return (
    <div className="site-container">
      <header className="editorial-intro">
        <p className="eyebrow">404 / Not found</p>
        <h1>A little off track.</h1>
        <p>This page is not in the chapter archive.</p>
      </header>
      <Link className="solid-button" href="/">
        Back to home
      </Link>
    </div>
  );
}
