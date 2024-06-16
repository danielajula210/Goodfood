import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import ReserveTable from '../../components/ReserveTable/ReserveTable'
import Feedback from '../../components/Feedback/Feedback'
import AverageFeedback from '../../components/AverageFeedback/AverageFeedback'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
      <ReserveTable/>
      <Feedback/>
    </>
  )
}

export default Home
