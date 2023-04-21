import React, { useEffect, useState } from 'react'
import "./searchResult.scss"
import { useParams } from 'react-router-dom'
import {FetchDataFromApi} from "../../utilities/api"
import Spinner from "../../components/spinner/Spinner"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import MovieCard from '../../components/movieCard/MovieCard'
import InfiniteScroll from 'react-infinite-scroll-component'


const SearchResult = () => {

  const [data, setdata] = useState(null)
  const [pageNum, setpageNum] = useState(1)
  const [loading, setloading] = useState(false)
  
  const {query} = useParams()

  const fetchInitialData =()=>{
    setloading(true)
    FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setdata(res)
      setpageNum((pre)=>pre+1)
      setloading(false)
    })
  }

  const fetchNextPageData =()=>{
    FetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      if(data?.results){
        setdata({...data, results:[...data?.results,...res.results] })
      }else{
        setdata(res)
      }
      setpageNum((pre)=>pre+1)
    })
  }

  useEffect(()=>{
    setpageNum(1)
    fetchInitialData()
  },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/> }
      {!loading && (
        <ContentWrapper>
          {data?.results?.length >0 ?(
            <>
            <div className="pageTitle">
              {`Search ${data.total_results >1 ? "results":"result"} of ${query}`}
              </div>
              <InfiniteScroll
              className='content'
              dataLength={data?.results.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner/>}
              >
                {data?.results.map((item,index)=>{
                  if(item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
              </>
          ):(
            <span className="resultNotFound">
              Sorry, Results Not Found
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult;