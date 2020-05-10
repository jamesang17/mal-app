import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Button } from '@material-ui/core';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { useEffect } from 'react';
import { getAnimeInfo } from '../../api/Jikan';


export default function AnimeDialog(props) {

    const [animeData, setAnimeData] = useState([])

    useEffect( () => {
        if (props.openState === true) {
            getAnimeInfo(props.malID).then( res => {
                const animeData = res;
                console.log(animeData)
                setAnimeData(animeData);
            });
        }},[props.openState])


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
                <DialogContentText>{animeData["synopsis"]}</DialogContentText>
            </DialogContent>
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