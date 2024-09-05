import logo from './logo.svg';
import './App.css';
import Cart from './Components/Cart';
import Product from './Components/Product';
import products from './Components/products.json';

function App() {
  return (
    <div className="App">
      <Cart></Cart>
      <div className='products'>
        <div className='row mt-5'>
          {
            products.map((product, key) => <Product {...product} key={key}></Product>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
