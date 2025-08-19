import React from 'react'
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";

import Creator from "../Home/Creator";
import Tech_Revolt from "../Home/Tech_Revolt";

function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Devotional />
      <Tech_Revolt />
      <Creator />
      
    </div>
  )
}

export default Home
