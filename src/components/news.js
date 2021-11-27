import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import configdetails from "../config/config";
import Spinner from "../spinner/Spinner";
import NewsItem from "./newsitem";
import configDetais from "../config/config";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalresult, setTotalresults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getApidetails = async () => {
    props.setProgress(10);
    let API_URL = `${configdetails.URL}?country=${props.country}&category=${props.category}&apiKey=${configDetais.API_KEY}&page=${page}&pagesize=${props.pagesize}`;
    setsLoading(true);
    let data = await fetch(API_URL);
    props.setProgress(10);
    let parsedata = await data.json();
    props.setProgress(70);
    setArticles(parsedata.articles);
    setTotalresults(parsedata.totalResults);
    setsLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}`;
    getApidetails();
  }, []);

  //   const onhandleNextClick = () => {
  //     setPage(page + 1);
  //     getApidetails();
  //   };

  //   const onhandlePrevClick = async () => {
  //     setPage(page - 1);
  //     getApidetails();
  //   };

  const fetchMoreData = async () => {
    setPage(page + 1);
    let API_URL = `${configdetails.URL}?country=${props.country}&category=${
      props.category
    }&apiKey=${configDetais.API_KEY}&page=${page + 1}&pagesize=${
      props.pagesize
    }`;
    setPage(page + 1);
    let data = await fetch(API_URL);
    let parsedata = await data.json();
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles));
    setTotalresults(parsedata.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        Top Headlines-{capitalizeFirstLetter(props.category)}
      </h1>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalresult}
        loader={<Spinner />}
        scrollableTarget="scrollableDiv"
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imgurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://www.deskdecode.com/wp-content/uploads/2018/01/no-signal-and-no-display-desktop-problem-min.jpg"
                    }
                    newsurl={element.url ? element.url : "No url.."}
                    author={element.author ? element.author : "null"}
                    date={element.publishedAt}
                    source={element.source.id ? element.source.id : "no source"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
};

export default News;
