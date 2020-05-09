import React, { useState, useEffect } from 'react';
import { topAnime, getAnimeInGenre, GenreIds } from '../../api/Jikan';
import { getSavedAnimeIds, getSavedAnimes } from '../../api/firestore';
import CardCarousel from '../carousel/CardCarousel';
import UserDashboard from './user/UserDashboard';
import { CircularProgress, Backdrop, Typography } from '@material-ui/core';


const Dashboard = (props) => {

    const currentUser = props.currentUser;
    const [animeResMap, setAnimeResMap] = useState(new Map());
    const [userAnimeIdsList, setUserAnimeIdsList] = useState(new Set());
    const [userAnimes, setUserAnimes] = useState([]);

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
                setUserAnimeIdsList(new Set());
                setUserAnimes([]);
            } else {
                await getSavedAnimeIds(user.uid).then(res => {
                    setUserAnimeIdsList(new Set(res));
                });
                await getSavedAnimes(user.uid).then(res => {
                    setUserAnimes(res);
                });
            }
        }

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
                        userAnimeList={userAnimeIdsList}
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
        <React.Fragment>
            <UserDashboard animes={userAnimes} />
            <Carousels animeResMap={animeResMap} />
        </React.Fragment>
    )
}

export default Dashboard;