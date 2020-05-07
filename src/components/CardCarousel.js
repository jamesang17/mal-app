import React from 'react';
import { Card, CardActions, CardMedia, CardContent, IconButton, Typography } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { topAnime } from '../api/Jikan';
import FavoriteIcon from '@material-ui/icons/Favorite';


class CardCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        // TODO: replace hard coded value with input valus
        
        topAnime(1).then( res => {
            this.setState ({
                results: res
            })     
        })
        
    }
    
    render () {

        const cardMedia = 
            {
            media: {
                height: 0,
                paddingTop: '56.25%', // 16:9,'56.25%'
            }
        };

        const responsive = {
            superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 5,
            maxWidth: "20vh"
            },
            desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 4,
            maxWidth: "25vh"
            },
            tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 3,
            maxWidth: "33vh"
            },
            mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
            maxWidth: "95vh"
            }
        };

        return (
            // TODO: Page is expanding too much, creating horizontal scrollbar - maybe in Home/App.js file?
            <Carousel 
                responsive={responsive}
                showDots={true}
            >
                {this.state.results.map( item => (
                    <Card style={{ padding:"2%", margin:"5%", height:"85%" }} raised={true}>
                        <CardMedia 
                            square="true"
                            image={item["image_url"]}
                            style={cardMedia.media}
                        />
                        <CardContent>
                            <Typography style={{ fontWeight: "bold" }}>{item["title"]}</Typography>
                            <Typography>{"Start Date: " + item["start_date"]}</Typography>
                            Rank: {item["rank"]}
                        </CardContent>
                        <CardActions>
                            <IconButton>
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Carousel>
        )
    } 
}

export default CardCarousel;