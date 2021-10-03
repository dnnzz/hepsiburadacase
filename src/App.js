import "./App.css";
import Header from "./components/Global/Header/Header";
import Sidebar from "./components/Global/Sidebar/Sidebar";
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='container'>
        <Sidebar />
        <ProductList />
      </div>
    </div>
  );
}

export default App;
