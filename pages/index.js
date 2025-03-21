// pages/index.js
import Layout from '../components/Layout';
import WarDashboard from '../components/WarDashboard';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to Naruto-Arena Clan War Tracker</h1>
      <WarDashboard />
    </Layout>
  );
}
