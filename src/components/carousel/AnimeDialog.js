import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, useMediaQuery } from '@material-ui/core';
import { Grid, Typography, Button } from '@material-ui/core';
import { getAnimeInfo } from '../../api/Jikan';
import AnimeCollapse from './AnimeCollapse';
import CustomBackdrop from '../CustomBackdrop';
import FavButton from './FavButton';

/*  Create state to pull history of dialogs clicked  */

export default function AnimeDialog(props) {

    const [animeData, setAnimeData] = useState([]);
    const [animeGenre, setAnimeGenre] = useState([]);
    const desktop = useMediaQuery('(min-width:600px)');
    const videoHeight = desktop ? "360" : "200";

    useEffect(() => {
        if (props.openState === true) {
            getAnimeInfo(props.malId).then(res => {
                setAnimeData(res);
                // Create array of genre
                let tempArray = [];
                res["genres"].forEach(item => {
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
        
    function showTrailer(animeData) {
        let trailer_url = animeData["trailer_url"];
        if (trailer_url !== null) {
            return (
                <iframe id="ytplayer" type="text/html" width="100%" height={videoHeight} title={animeData["title"]}
                src={trailer_url}
                frameborder="0"></iframe>
            );
        }
        return null;
    }

    const dialogComponent = (
        <React.Fragment>
            <DialogContent>
                <Grid container
                    direction="row"
                    alignItems="center"
                    justify="center"
                    spacing={4}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5">{animeData["title"]}</Typography>
                        <Typography variant="subtitle1"><span style={{ color: "#545e6e" }}>{animeData["title_english"]}</span></Typography>
                        <Typography variant="subtitle1"><span style={{ color: "#545e6e" }}>{animeData["title_japanese"]}</span></Typography>
                        <Typography variant="body1"><b>Status:</b> <span style={{ color: "#41b2d1" }}>{animeData["status"]}</span></Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ padding: "1%" }}>
                        <img src={animeData["image_url"]} alt="anime" style={{width: "100%"}}/>
                    </Grid>
                    <Grid item  xs={12} sm={6}>
                        <Grid container alignItems="center" direction="row" justify="center" spacing={6} style={{ padding: "5%", background: "#e4edf5" }}>
                            <Grid item xs={12} sm={6}>
                                <Grid container direction="column" alignItems="center">
                                    <Typography variant="h6" style={{ color: "#043357" }}>Score:</Typography>
                                    <Typography variant="h4" style={{ color: "#6BBEBB" }}>{animeData["score"]}</Typography>
                                    <Typography variant="body2" style={{ color: "#40515e" }}>Scored by: {animeData["scored_by"]} users</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" style={{ color: "#043357" }}>Rank: <span style={{ color: "#40515e" }}>{animeData["rank"]}</span></Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" style={{ color: "#043357" }}>Followers: <span style={{ color: "#40515e" }}>{animeData["members"]}</span></Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" style={{ color: "#043357" }}>Favorites: <span style={{ color: "#40515e" }}>{animeData["favorites"]}</span></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="left" gutterBottom={true} style={{ paddingTop: "2%" }}><b>Synopsis</b></Typography>
                        <Typography gutterBottom={true}>{animeData["synopsis"]}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="column" alignItems="center">
                            <AnimeCollapse title={"Genre Tags"} content={animeGenre} />
                            <AnimeCollapse title={"Opening Songs"} content={animeData["opening_themes"]} />
                            <AnimeCollapse title={"Closing Songs"} content={animeData["ending_themes"]} />
                        </Grid>
                    </Grid>
                </Grid>
                <Typography variant="h6" style={{ color: "#043357" }}>Trailer</Typography> 
                {showTrailer(animeData)}
            </DialogContent>
            <DialogActions>
                <FavButton
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
            >
                {animeData.length === 0 ? <CustomBackdrop shouldOpen={true}/> : dialogComponent }
            </Dialog>
        </React.Fragment>
    ) 
}