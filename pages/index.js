import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList'

function Home({products}) {
  return <ProductList products={products}/>
}

Home.getInitialProps = async () => {
  //fetch data on server
  const url = 'http://localhost:3000/api/products';
  const response = await axios.get(url);

  //return response data as an objext 
  return { products: response.data };

  //note: this object will be merged with initial props
}

export default Home;
