import React, { useState } from "react";

import "./videosection.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import { Playbtn } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopUp";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results.map((video)=>{
                            return (
                                <div
                                key={video.id}
                                onClick={()=>{
                                    setVideoId(video.key)
                                    setShow(true)
                                }}
                                className="videoItem">
                                    <div className="videoThumbnail">
                                        <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                                        <Playbtn/>
                                    </div>
                                    <div className="videoTitle">
                                        {video.name}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;