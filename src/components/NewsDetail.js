import React from 'react';
import {Paper, Typography, CardMedia, makeStyles} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import {GET_NEWS_DETAIL} from "./graphql/NewsDetailGraphQL.js";
import {useQuery} from "@apollo/client";
import {useHistory} from "react-router-dom";
import {gqlConfig} from "./gql.config";
import Media from "./Media";


const NewsDetail = (props) => {
    let {newsId} = useParams();
    const classes = useStyles();
    const variables = Object.assign(gqlConfig, {newsId: newsId})
    const {loading, error, data} = useQuery(GET_NEWS_DETAIL, {
        variables: variables,
    });

    const [news, setNews] = React.useState({
        image: "",
        body: "",
        title: "",
        id: ""
    });


    React.useEffect(() => {
        if (loading === false && data) {
            const newsNode = data.response.news;
            let item = [];
            if (newsNode.media != null) {
                 item = {
                    id: newsNode.newsid,
                    title: newsNode.title,
                    body: newsNode.description.value,
                    image: process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${newsNode.image.refNode.path}`,
                    publishedDate: newsNode.publishedDate.value,
                    publishedBy: newsNode.publishedBy.value,
                     mediaId: newsNode.media.node.id,
                     mediaPath: newsNode.media.node.path,
                     mediaType: newsNode.media.node.type.value,
                     mediaMixins: newsNode.media.node.mixins
                 }
            } else {
                 item = {
                    id: newsNode.newsid,
                    title: newsNode.title,
                    body: newsNode.description.value,
                    image: process.env.REACT_APP_JCONTENT_FILES_ENDPOINT + `${newsNode.image.refNode.path}`,
                    publishedDate: newsNode.publishedDate.value,
                    publishedBy: newsNode.publishedBy.value
                }
            }

            setNews(item);
        }
    }, [loading, data]);

    if (loading) return <img src={`https://via.placeholder.com/1024x768/09f/fff?text=Loading`} alt="loading"/>;
    if (error) return <p>Error ${error}</p>;


    return (
        <Paper
            className={classes.root} elevation={3}>
            {news !== undefined &&
            <>
                {news.image !== "" &&
                <CardMedia
                    image={news.image}
                    className={classes.media}/>
                }
                <div className={classes.content}>
                    <BackButton/>
                    <Typography variant="h2" className={classes.title}>{news.title}</Typography>
                    {news.mediaId &&
                    <Media id={news.mediaId}
                           type={news.mediaType?news.mediaType:null}
                           mixins={news.mediaMixins?news.mediaMixins.map(mixin=>mixin.value):[]}
                           path={news.mediaPath}
                           alt={news.title}
                    />
                    }
                    <Typography variant="body2" component="p">by: {news.publishedBy}</Typography>
                    <Typography variant="body2"
                                component="p">on: {new Date(news.publishedDate).toLocaleDateString("en-US")}</Typography>
                    <div dangerouslySetInnerHTML={{__html: news.body}}/>
                </div>
            </>
            }
        </Paper>
    );
}

export default NewsDetail;

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 20,
        marginBottom: 20
    },
    content: {
        padding: 30
    },
    title: {
        marginTop: 20,
        marginBottom: 20
    },
    media: {
        height: 0,
        paddingTop: "50%"
    }
}));


export const BackButton = () => {
    let history = useHistory();
    return (
        <>
            <button onClick={() => history.goBack()}>Back</button>
        </>
    );
};