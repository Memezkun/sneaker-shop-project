import Card from '../components/Card';

function Home({onAddToFavorite, onChangeSearchInput, onAddToCart, searchValue, items, setSearchValue}) {
  return (
    <div className='content p-40'>
      <div className='d-flex align-center mb-40 justify-between'>
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className='search-block d-flex'>
          <img src="/img/search.svg" alt="Search"/>
          {searchValue ? 
          <img 
            onClick={() => setSearchValue('')} 
            className='clear cu-p' 
            src="img/btn-remove.svg" 
            alt="Clear"/>
            : null}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...'/>
        </div>
      </div>

      <div className='d-flex flex-wrap'>
        {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => 
          (<Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            {...item}
          />)
        )}
      </div>
    </div>
  );
}

export default Home;