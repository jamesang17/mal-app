import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Grid, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Glide from '@glidejs/glide';


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

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return (
        <Carousel responsive={responsive}>
            {mangaArray.map( item => (
                <Card className={classes.root} raised={true}>
                    <CardHeader
                        title={item["Title"]}
                        subheader={item["LastUpdate"]}
                    />
                    <CardContent>
                        {item["Description"]}
                    </CardContent>
                </Card>
            ))}
        </Carousel>
    )
}

export default MangaCard;