import Layout from "../components/Layout";
import WarForm from "../components/WarForm";
import WarList from "../components/WarList";

export default function WarsPage() {
  return (
    <Layout>
      <h1>Manage Wars</h1>
      <WarForm />
      <WarList />
    </Layout>
  );
}
