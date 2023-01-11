import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { Spinner } from '../Spinner';
import { VideoItem } from './VideoItem'

export const Video = () => {


    const { URL } = useContext(AppContext);



    const [isLoading, setIsLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [img, setImg] = useState('');
    const [videoPath, setVideoPath] = useState('');

    useEffect(() => {
        return () => {

            fetch(`${URL}api/web/videos`)
                .then((response) => response.json())
                .then((actualData) => { setVideos(actualData.data); setImg(actualData.thumbnail_path); setVideoPath(actualData.video_path); setIsLoading(false) })
            setIsLoading(false)
        }
    }, [])
 
    return (
        <>
            <div className="container sect py-md-5 py-3 text-start">
                <div className="row">
                    <div className="col-12">
                        <h2 className='ps-0 heading'>Video Show</h2>
                    </div>
                </div>
                <div className="row">
                    {
                        isLoading ? <Spinner /> :
                            videos && videos.map((item) => {

                                return <VideoItem image={`${img}/${item.thumbnail}`} video={`${videoPath}/${item.video}`} item={item} />

                            })

                    }
                </div>
            </div>
        </>
    )
}
