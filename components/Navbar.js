// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Initialize based on saved preference or default to dark mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'false') {
      setDarkMode(false);
      document.body.classList.add('light-mode');
    } else {
      setDarkMode(true);
      document.body.classList.remove('light-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('darkMode', 'false');
      setDarkMode(false);
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('darkMode', 'true');
      setDarkMode(true);
    }
  };

  return (
    <nav className="navbar">
      <Link href="/"><a>Home</a></Link>
      <Link href="/clans"><a>Clans</a></Link>
      <Link href="/wars"><a>Wars</a></Link>
      <Link href="/stats"><a>Stats</a></Link>
      <button onClick={toggleDarkMode} style={{ marginLeft: 'auto' }}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}
