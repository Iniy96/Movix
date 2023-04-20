import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FetchDataFromApi } from "./utilities/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGeneres } from "./store/homeSlice"

import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home)

  useEffect(() => {
    fectchapiConfig()
    genresCall()
  }, [])

  const fectchapiConfig = async () => {
    await FetchDataFromApi("/configuration")
      .then((res) => {
        const url ={
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        }
        dispatch(getApiConfiguration(url))
      })
  }

  const genresCall =async()=>{
    let promises =[]
    let endpoints =["tv","movie"]
    let allGenres ={}

    endpoints.forEach((endpoint)=>{
      promises.push(FetchDataFromApi(`/genre/${endpoint}/list`)) 
    })

    const data = await Promise.all(promises);
   
    data.map(({genres})=>{
      genres.map((item)=>{
        return allGenres[item.id] = item
      })
    })
    dispatch(getGeneres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
