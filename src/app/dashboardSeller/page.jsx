import FabricCanvas from '../components/FabricCanvas'
const DashboardSeller = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Dashboard Seller</h1>
      <p className="text-lg">Welcome to your seller dashboard!</p>
      <h1>Fabric.js in Next.js</h1>
      <FabricCanvas/>
    </div>
  );
}

export default DashboardSeller;