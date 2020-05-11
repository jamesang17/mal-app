import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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

export default function AnimeCollapse(props) {

    const classes = useStyles();
    
    return (
        <ExpansionPanel 
            style={{width:"95%"}}
        >
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
                <Typography className={classes.heading}>{props.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
    {Array.isArray(props.content) ? <ul>{props.content.map( item => (<li>{item}</li>))}</ul> : <Typography>{props.content}</Typography> }
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}