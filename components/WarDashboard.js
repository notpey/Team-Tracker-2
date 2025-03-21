// components/WarDashboard.js
import Link from 'next/link';

export default function WarDashboard() {
  return (
    <div>
      <p>Welcome to your Naruto-Arena war management tool.</p>
      <p>
        Use the navigation above to manage clans, enter war data, and view detailed statistics.
      </p>
      <p>
        Or click <Link href="/wars"><a>here</a></Link> to enter war data now.
      </p>
    </div>
  );
}
