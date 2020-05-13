import React, { useContext } from 'react';
import CardCarousel from '../carousel/CardCarousel';
import UserDashboard from './UserDashboard';
import Typography from '@material-ui/core/Typography';
import CustomBackdrop from '../CustomBackdrop';
import { DataContext } from './DataProvider';


const Dashboard = () => {
    const {animeResMap,userAnimes} = useContext(DataContext);

    const Carousels = (props) => {
        let parentContainer = [];
        props.animeResMap.forEach(function(value,key) {
            let carouselContainer = [];
            carouselContainer.push(
                <Typography variant="h4" key={`${key}+title`} style={{color:"white"}}>{key}</Typography>
            );
            carouselContainer.push(
                <React.Fragment key={`carousel+${key}`}>
                    <CardCarousel
                        animeList={value}
                    />    
                </React.Fragment>
            )
            parentContainer.push(<div key={key}>{carouselContainer}</div>);
        });
        return parentContainer;
    }

    if (animeResMap.size === 0) {
        return (
            <CustomBackdrop shouldOpen={true} />
        )
    }
    return (
        <React.Fragment>
            <UserDashboard animes={userAnimes} />
            <div style={{ padding: "2%" }} >
                <Carousels animeResMap={animeResMap} />
            </div>
        </React.Fragment>
    )
}

export default Dashboard;