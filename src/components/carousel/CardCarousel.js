import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AnimeCard from './AnimeCard';



const CardCarousel = (props) => {

    // Screen dimensions adjustments
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
        <Carousel 
            responsive={responsive}
            showDots={true}
        >
            {props.animeList.map( item => (
                <AnimeCard 
                    item={item}
                    key={item.mal_id}
                    userAnimeList={props.userAnimeList}
                />
            ))}
        </Carousel>
    )
}

export default CardCarousel;