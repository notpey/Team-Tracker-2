// components/WarDashboard.js
import Link from 'next/link';

export default function WarDashboard() {
  return (
    <div>
      <p>Welcome to your clan war management dashboard!</p>
      <p>
        To manage wars, click <Link href="/wars"><a>here</a></Link>.
      </p>
      <p>
        To view statistics, click <Link href="/stats"><a>here</a></Link>.
      </p>
    </div>
  );
}
