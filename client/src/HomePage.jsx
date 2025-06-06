import OrderTable from './OrderTable';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div className="home-page m-6" >
 <div className="relative flex items-center justify-between px-4">
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <h1 className="text-5xl font-bold text-center">Records</h1>
  </div>
  
  <div></div> {/* Placeholder to occupy left space */}
   <Link to="/create">
  <button
    className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
  >
    + Add New
  </button>
  </Link>
</div>
      
      <OrderTable />
    </div>
  );
}
export default HomePage;