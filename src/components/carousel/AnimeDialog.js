import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { Grid, Typography, Button } from '@material-ui/core';
import { getAnimeInfo } from '../../api/Jikan';
import AnimeCollapse from './AnimeCollapse';
import CustomBackdrop from '../CustomBackdrop';
import FavButton from './FavButton';

/*  Create state to pull history of dialogs clicked  */

export default function AnimeDialog(props) {

    const [animeData, setAnimeData] = useState([]);
    const [animeGenre, setAnimeGenre] = useState([]);

    useEffect( () => {
        if (props.openState === true) {
            getAnimeInfo(props.malId).then( res => {
                setAnimeData(res);
                console.log(res);

                // Create array of genre
                let tempArray = [];
                res["genres"].forEach( item => {
                    tempArray.push(item["name"]);
                });
                setAnimeGenre(tempArray);

            });
        }
        return function cleanUp() {
            setAnimeData([]);
            setAnimeGenre([]);
        }
        }, [props.openState])
        
    const dialogComponent = (
        <React.Fragment>
            <DialogContent>
                <Grid container
                    direction="row"
                    alignItems="center"
                    wrap="nowrap"
                >
                    <Grid item>
                        <img src={animeData["image_url"]} alt="anime image" />
                    </Grid>
                    <Grid item style={{padding: "5%"}}>
                        <Typography variant="h6">{animeData["title"]}</Typography>
                        <Typography style={{paddingBottom: "5%"}}>{animeData["title_japanese"]}</Typography>   
                        <Typography><b>Status:</b> {animeData["status"]}</Typography>
                        <Typography><b>Rank:</b> {animeData["rank"]}</Typography>
                        <Typography><b>Score:</b> {animeData["score"]}</Typography>
                        <Typography><b>Views:</b> {animeData["members"]}</Typography>    
                    </Grid>
                </Grid>
                <Typography variant="h6" align="left" gutterBottom={true} style={{paddingTop: "2%"}}><b>Synopsis</b></Typography>
                <Typography gutterBottom={true}>{animeData["synopsis"]}</Typography>
            </DialogContent>
            <Grid container
                direction="column"
                alignItems="center"
            >
                <AnimeCollapse title={"Genre Tags"} content={animeGenre} />
                <AnimeCollapse title={"Opening Songs"} content={animeData["opening_themes"]} />
                <AnimeCollapse title={"Closing Songs"} content={animeData["ending_themes"]} />
            </Grid>
            <DialogActions>
                <FavButton 
                    userAnimeList={props.userAnimeList}
                    malId={animeData["mal_id"]} 
                    title={animeData["title"]}
                    imageUrl={animeData["image_url"]}
                />
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
                fullWidth={true}
            >
                {animeData.length === 0 ? <CustomBackdrop shouldOpen={true}/> : dialogComponent }
            </Dialog>
        </React.Fragment>
    ) 
}