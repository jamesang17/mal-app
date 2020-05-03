import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Grid, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


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

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    let mangaArray = [
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
        {"Title":"Shokugeki","LastUpdate":"1/1/1111","Description":"Anime description here."},
    ]

    return (
        <Carousel autoPlay>
            {mangaArray.map( mangaItem => (
                <Card className={classes.root} raised={true}>
                    <CardHeader 
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={mangaItem['Title']}
                        subheader={"Last Update: " + mangaItem['LastUpdate']}
                    />
                    <CardMedia /> 
                    <CardContent>
                        <Typography>
                            {mangaItem['Description']}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Carousel>
    )
}

export default MangaCard;