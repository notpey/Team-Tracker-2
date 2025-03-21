// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/"><a>Home</a></Link>
      <Link href="/clans"><a>Clans</a></Link>
      <Link href="/wars"><a>Wars</a></Link>
      <Link href="/stats"><a>Stats</a></Link>
    </nav>
  );
}
