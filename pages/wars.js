// pages/wars.js
import Layout from '../components/Layout';
import WarForm from '../components/WarForm';
import MatchHistoryInput from '../components/MatchHistoryInput';
import WarList from '../components/WarList';

export default function WarsPage() {
  return (
    <Layout>
      <h1>Enter War Data</h1>
      <WarForm />
      <MatchHistoryInput />
      <WarList />
    </Layout>
  );
}
