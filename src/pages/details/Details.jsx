import React from 'react'
import "./details.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import DetailsBanner from "./detailsBanner/DetailsBanner"
import Cast from './cast/Cast'
import VideosSection from './videoSection/VideoSection'
import SimilarSection from './carousels/SimilarSection'
import RecommendationSection from './carousels/RecommendationSection'

const Details = () => {

  const {mediaType,id}=useParams()
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits,loading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div >
     <DetailsBanner video={data?.results?.[0]}
     crew={credits?.crew}/>
     <Cast data={credits?.cast} loading={creditsLoading} />
     <VideosSection data={data} loading={loading} />
     <SimilarSection mediaType={mediaType} id={id} />
     <RecommendationSection mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details