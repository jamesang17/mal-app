import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@material-ui/core';
import { CircularProgress, Backdrop, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { getAnimeInfo } from '../../api/Jikan';
import AnimeCollapse from './AnimeCollapse';


export default function AnimeDialog(props) {

    const [animeData, setAnimeData] = useState([]);
    const [animeGenre, setAnimeGenre] = useState([]);

    useEffect( () => {
        if (props.openState === true) {
            getAnimeInfo(props.malID).then( res => {
                setAnimeData(res);

                // Create array of genre
                let tempArray = [];
                res["genres"].forEach( item => {
                    tempArray.push(item["name"]);
                });
                setAnimeGenre(tempArray);

            });
        }}, [props.openState])

    const loadingComponent = (
        <Backdrop open={true} style={{color: "#fff"}}>
            <CircularProgress style={{color: "white"}}/>
        </Backdrop>
    )
        
    const dialogComponent = (
        <React.Fragment>
            <DialogTitle>
                <Typography variant="h5">{animeData["title"]}</Typography>
                <Typography>{animeData["title_japanese"]}</Typography>
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <Grid container
                direction="column"
                alignItems="center"
            >
                <AnimeCollapse title={"Synopsis"} content={animeData["synopsis"]} />
                <AnimeCollapse title={"Genre Tags"} content={animeGenre} />
                <AnimeCollapse title={"Opening Songs"} content={animeData["opening_themes"]} />
                <AnimeCollapse title={"Closing Songs"} content={animeData["ending_themes"]} />
            </Grid>
            
            <DialogActions>
                <Button
                    onClick={props.closeFunction}
                    color="primary"
                    autoFocus
                >
                    Close
                </Button>
            </DialogActions>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <Dialog
                open={props.openState}
                onClose={props.closeFunction}
            >
                {animeData.length === 0 ? loadingComponent : dialogComponent }
            </Dialog>
        </React.Fragment>
    ) 
}