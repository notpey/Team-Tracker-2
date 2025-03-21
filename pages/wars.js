// pages/wars.js
import Layout from '../components/Layout';
import WarForm from '../components/WarForm';
import WarList from '../components/WarList';

export default function Wars() {
  return (
    <Layout>
      <h1>Manage Clan Wars</h1>
      <WarForm />
      <WarList />
    </Layout>
  );
}
