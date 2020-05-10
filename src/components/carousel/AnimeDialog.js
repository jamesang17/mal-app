import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Button } from '@material-ui/core';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useEffect } from 'react';
import { getAnimeInfo } from '../../api/Jikan';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

function AnimeCollapse(props) {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <ExpansionPanel 
            expanded={expanded === 'panel1'} 
            onChange={handleChange('panel1')}
            style={{width:"90%"}}
        >
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
                <Typography className={classes.heading}>{props.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                    maximus est, id dignissim quam.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default function AnimeDialog(props) {

    const [animeData, setAnimeData] = useState([]);

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
            <DialogTitle
            >
                <Typography variant="h5">{animeData["title"]}</Typography>
                <Typography>{animeData["title_japanese"]}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{animeData["synopsis"]}</DialogContentText>
            </DialogContent>
            <AnimeCollapse title={"Genre"}/>
            <AnimeCollapse title={"Opening Theme Songs"}/>
            <AnimeCollapse title={"Closing Theme Songs"}/>
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