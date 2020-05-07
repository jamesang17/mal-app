import React, { useState, useEffect } from 'react';
import { searchAnime, searchManga, searchCharacter,
    topAnime, topManga, AnimeTopTypes, MangaTopTypes, SearchObj,
    getAnimeInGenre, getMangaInGenre, GenreIds, GenreObj,
    getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats,
    Anime } from '../api/Jikan';
import CardCarousel from './CardCarousel';


const Dashboard = () => {

    const [animeGenre, setGenre] = useState([2,4,22]);
    const [topAnimeResults, setTopAnime] = useState([]);

    useEffect( () => {
        const fetchTop = () => {
            topAnime().then( res => {
                setTopAnime(res);
            });
        } 

        const fetchGenre = () => {
            getAnimeInGenre(GenreIds.ACTION).then( res => {
                setGenre(res);
                console.log(res)
            });
        }
        fetchGenre();
        fetchTop();
    }, []);


    

    return (
        <React.Fragment>
            <CardCarousel 
                animeList={topAnimeResults}
                
            /> 
            <CardCarousel 
                animeList={animeGenre}/>
        </React.Fragment>
    )

}

export default Dashboard;