import React from 'react';
import {Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios.get('https://61d5ad742b4f730017a829ac.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://61d5ad742b4f730017a829ac.mockapi.io/Cart').then((res) => {
      setCartItems(res.data);
    });
    axios.get('https://61d5ad742b4f730017a829ac.mockapi.io/favorites').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://61d5ad742b4f730017a829ac.mockapi.io/Cart', obj);
    setCartItems(prev => [...prev, obj]);
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://61d5ad742b4f730017a829ac.mockapi.io/Cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://61d5ad742b4f730017a829ac.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      axios.post('https://61d5ad742b4f730017a829ac.mockapi.io/favorites', obj);
      setFavorites(prev => [...prev, obj]);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear">
      {cartOpened ? <Drawer 
        items={cartItems} 
        onClose={() => setCartOpened(false)} 
        onRemove={onRemoveItem}/> : null}

      <Header onClickCart = {() => setCartOpened(true)} />

      <Routes>
        <Route exact path='/'
          element={<Home
            onAddToFavorite={onAddToFavorite}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            searchValue={searchValue}
            items={items}
            setSearchValue={setSearchValue}
          />}>
        </Route>
        <Route exact path='/favorites'
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>}>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
