import React from 'react';
import { Drawer, Typography } from '@material-ui/core';
import CardCarousel from '../carousel/CardCarousel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    background: '#586473',
    color: 'white'
  }
});

const ResultDrawer = (props) => {
  const styles = useStyles();

  return (
    <Drawer anchor="top" open={props.shouldOpen} 
      onClose={e => props.setDrawer(false)} classes={{ paper: styles.paper }}>
      <div style={{ padding: "2%"}}>
        <Typography variant="h6">Results for:
          <span style={{ color: "#62d9d5" }}> {props.query}</span>
        </Typography>
        <div style={{ padding: "0" }}>
          <CardCarousel animeList={props.results} userAnimeList={new Set()} />
        </div>
      </div>
    </Drawer>
  )
}

export default ResultDrawer;