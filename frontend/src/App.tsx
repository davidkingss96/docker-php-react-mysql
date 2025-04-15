import ProductosList from './components/ProductosList.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <div>
            <ProductosList />
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default App;
