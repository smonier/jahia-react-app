import React from 'react';
import NewsItem from './NewsItem';
import { Grid } from '@material-ui/core';

const NewsList = props => {
  return (
      <Grid container spacing={2}>
        {props.items.map((item) => (
            <Grid
                item sm={12} md={3}
                key={item.id}>
              <NewsItem item={item} />
            </Grid>
        ))}
      </Grid>
  )
};

export default NewsList;
