import React from 'react'

import Banner from '../components/carousel/Banner'
import Category from '../components/carousel/Category'
import FeaturedProduct from '../components/products/FeaturedProduct';


const Home = () => {
  return (
    <>
      <Banner />
      <Category />
      <FeaturedProduct />
    </>
  );
}

export default Home

