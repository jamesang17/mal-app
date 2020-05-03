import React from 'react';
import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Grid, IconButton, Typography, ListSubheader } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
}))

function MangaCard(props) {
    
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item>
                <Card className={classes.root}>
                    <CardHeader 
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Shokugeki no Souma"
                        subheader="Last Update: 1/1/1111"
                    />
                    <CardMedia /> 
                    <CardContent>
                        <Typography>
                            Anime synopsis here.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </React.Fragment>
        
    )
}

export default MangaCard;