import React, { useState, useEffect } from 'react';
import { searchAnime, searchManga, searchCharacter,
    topAnime, topManga, AnimeTopTypes, MangaTopTypes, SearchObj,
    getAnimeInGenre, getMangaInGenre, GenreIds, GenreObj,
    getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats,
    Anime } from '../../api/Jikan';
import { getSavedAnimes } from '../../api/firestore';
import CardCarousel from '../carousel/CardCarousel';
import { CircularProgress, Backdrop, Typography } from '@material-ui/core';


const Dashboard = (props) => {

    const currentUser = props.currentUser;
    const [animeResMap, setAnimeResMap] = useState(new Map());
    // const [animeGenre, setGenre] = useState([]);
    // const [topAnimeResults, setTopAnime] = useState([]);
    const [userAnimeList, setUserAnimeList] = useState(new Set());
    const [backdrop, setBackdrop] = useState(false);

    const showBackdrop = (value) => {
        setBackdrop(value);
    }

    useEffect( () => {
        const fetchAnimes = async () => {
            const tempAnimeResMap = new Map();
            await topAnime().then(res => {
                tempAnimeResMap.set("TOP AIRING", res);
            });
            await getAnimeInGenre(GenreIds.ACTION).then(res => {
                tempAnimeResMap.set("ACTION", res); 
            });
            // await getAnimeInGenre(GenreIds.COMEDY).then(res => {
            //     tempAnimeResMap.set("COMEDY", res);
            // });
            // await getAnimeInGenre(GenreIds.ROMANCE).then(res => {
            //     tempAnimeResMap.set("ROMANCE", res);
            // });
            // await getAnimeInGenre(GenreIds.MECHA).then(res => {
            //     tempAnimeResMap.set("MECHA", res);
            // });
            // await getAnimeInGenre(GenreIds.SPORTS).then(res => {
            //     tempAnimeResMap.set("SPORTS", res);
            // });
            setAnimeResMap(tempAnimeResMap);
        }
        // const fetchTop = () => {
        //     topAnime().then( res => {
        //         setTopAnime(res);
        //     });
        // } 

        // const fetchGenre = () => {
        //     getAnimeInGenre(GenreIds.ACTION).then( res => {
        //         setGenre(res);
        //     });
        // }
        const fetchUserAnimes = async (user) => {
            if (user == null) return;
            await getSavedAnimes(user.uid).then(res => {
                setUserAnimeList(new Set(res));
            })
        }
        fetchUserAnimes(currentUser);
        // fetchGenre();
        // fetchTop();
        fetchAnimes();
    }, [currentUser]);

    const Carousels = (props) => {
        let parentContainer = [];
        props.animeResMap.forEach(function(value,key) {
            let carouselContainer = [];
            carouselContainer.push(
                <Typography variant="h4">{key}</Typography>
            );
            carouselContainer.push(
                <React.Fragment>
                    <CardCarousel 
                        animeList={value}
                        userAnimeList={userAnimeList}
                        currentUser={currentUser}
                        showBackdrop={showBackdrop}
                    />    
                </React.Fragment>
            )
            parentContainer.push(carouselContainer);
        });
        return parentContainer;
    }

    if (animeResMap.size === 0 ||
        userAnimeList.size === 0 || 
        currentUser == null) {
        return (
            <Backdrop open={true} style={{color: "#fff"}}>
                <CircularProgress style={{color: "white"}}/>
            </Backdrop>
        )
    }
    return (
        <React.Fragment>
            <Backdrop open={backdrop} style={{ zIndex: 999 ,color: "#fff" }} onClick={e => setBackdrop(false)}>
                <CircularProgress style={{ color: "white" }} />
            </Backdrop>
            <Carousels animeResMap={animeResMap} />
        </React.Fragment>        
    )
}

export default Dashboard;