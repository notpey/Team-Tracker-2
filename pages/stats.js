import Layout from "../components/Layout";
import PlayerStats from "../components/PlayerStats";
import CharacterStats from "../components/CharacterStats";

export default function StatsPage() {
  return (
    <Layout>
      <h1>Statistics</h1>
      <PlayerStats />
      <CharacterStats />
    </Layout>
  );
}
