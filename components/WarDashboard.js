import Link from "next/link";

export default function WarDashboard() {
  return (
    <div>
      <p>Welcome to your clan war management dashboard!</p>
      <p>
        Manage wars and view statistics using the navigation above or by clicking{" "}
        <Link href="/wars">
          <a>here</a>
        </Link>
        .
      </p>
    </div>
  );
}
