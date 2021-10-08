import "./App.css";
import Header from "./components/Global/Header/Header";
import Sidebar from "./components/Global/Sidebar/Sidebar";
import ProductList from "./components/ProductList/ProductList";
import Context from "./components/Context/Context";
function App() {
  return (
    <Context>
      <div className='App'>
        <Header />
        <div className='container'>
          <Sidebar />
          <ProductList />
        </div>
      </div>
    </Context>
  );
}

export default App;
