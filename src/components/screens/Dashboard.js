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
    const [userAnimeList, setUserAnimeList] = useState(new Set());

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

        const fetchUserAnimes = async (user) => {
            if (user == null) {
                setUserAnimeList(new Set());
            } else {
                await getSavedAnimes(user.uid).then(res => {
                    setUserAnimeList(new Set(res));
                })
            }
        }
        console.log(currentUser);
        fetchUserAnimes(currentUser);
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
                    />    
                </React.Fragment>
            )
            parentContainer.push(carouselContainer);
        });
        return parentContainer;
    }

    if (animeResMap.size === 0) {
        return (
            <Backdrop open={true} style={{color: "#fff"}}>
                <CircularProgress style={{color: "white"}}/>
            </Backdrop>
        )
    }
    return (
        <Carousels animeResMap={animeResMap} />
    )
}

export default Dashboard;