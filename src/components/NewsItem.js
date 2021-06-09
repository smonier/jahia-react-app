import React from 'react';
import {Link} from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  capitalize
} from '@material-ui/core';


const NewsItem = props => {
  const classes = useStyles();
  const news = props.item;

  return (
    <Link
      className={classes.link}
      to={`/news/${news.id}`}>
      <Card
        key={news.id}
        className={classes.root}>
        <CardMedia
          className={classes.media}
          image={news.image}/>
        <CardContent>
          <Typography variant="h6">
            {capitalize(news.title)}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: news.description.substring(0,100)+" ..." }}></div>

        </CardContent>
      </Card>
    </Link>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    marginTop: 20
  },
  media: {
    height: 250
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary
  },
  h6: {
    textTransform: "capitalize"
  }

}));

export default NewsItem;

