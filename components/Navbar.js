import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ background: "#333", color: "#fff", padding: "10px" }}>
      <Link href="/">
        <a style={{ color: "#fff", marginRight: "10px" }}>Home</a>
      </Link>
      <Link href="/wars">
        <a style={{ color: "#fff", marginRight: "10px" }}>Wars</a>
      </Link>
      <Link href="/stats">
        <a style={{ color: "#fff" }}>Stats</a>
      </Link>
    </nav>
  );
}
