import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import configdetails from "../config/config";
import Spinner from "../spinner/Spinner";
import NewsItem from "./newsitem";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const { category, country, pagesize, setProgress } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalresult, setTotalresults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getApidetails = useCallback(async () => {
    setProgress(10);
    let API_URL = `${configdetails.URL}?country=${country}&category=${category}&page=1&pageSize=${pagesize}`;
    setsLoading(true);
    let data = await fetch(API_URL);
    setProgress(10);
    let parsedata = await data.json();
    setProgress(70);
    setArticles(parsedata.articles);
    setTotalresults(parsedata.totalResults);
    setsLoading(false);
    setProgress(100);
  }, [category, country, pagesize, setProgress]);

  useEffect(() => {
    document.title = `Briefly | ${capitalizeFirstLetter(category)} headlines`;
    setPage(1);
    getApidetails();
  }, [getApidetails, category]);

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
    }&page=${page + 1}&pageSize=${props.pagesize}`;
    setPage(page + 1);
    let data = await fetch(API_URL);
    let parsedata = await data.json();
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles));
    setTotalresults(parsedata.totalResults);
  };

  return (
    <>
      <main className="news-page">
        <div className="news-heading">
          <div>
            <span className="news-heading__eyebrow">The latest, in brief</span>
            <h1>{capitalizeFirstLetter(category)} headlines</h1>
          </div>
          <span className="news-heading__edition">
            {new Intl.DisplayNames(["en"], { type: "region" }).of(country.toUpperCase())} edition
          </span>
        </div>

        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalresult}
          loader={<Spinner />}
        >
          <div className="article-grid">
            {articles.map((element) => {
              return (
                <div className="article-grid__item" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description
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
        </InfiniteScroll>
      </main>
    </>
  );
};

News.defaultProps = {
  country: "us",
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
};

export default News;
