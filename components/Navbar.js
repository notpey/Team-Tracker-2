// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      background: '#333',
      color: '#fff',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <Link href="/">
        <a style={{ marginRight: '15px', color: '#fff', fontWeight: 'bold' }}>Home</a>
      </Link>
      <Link href="/wars">
        <a style={{ marginRight: '15px', color: '#fff' }}>Wars</a>
      </Link>
      <Link href="/stats">
        <a style={{ color: '#fff' }}>Stats</a>
      </Link>
    </nav>
  );
}
