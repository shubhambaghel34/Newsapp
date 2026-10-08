import React from "react";

const NewsItem = (props) => {
  let { title, description, imgurl, newsurl, author, date, source } = props;
  const publishedDate = date ? new Date(date) : null;

  return (
    <article className="story-card">
      <div className="story-card__image-wrap">
        <img src={imgurl} className="story-card__image" alt={title} loading="lazy" />
        <span className="story-card__source">{source || "News"}</span>
      </div>
      <div className="story-card__body">
        <h2 className="story-card__title">{title}</h2>
        <p className="story-card__description">{description}</p>
        <div className="story-card__footer">
          <div className="story-card__byline">
            <span>{author || "Staff writer"}</span>
            {publishedDate && !Number.isNaN(publishedDate.getTime()) && (
              <time dateTime={publishedDate.toISOString()}>
                {publishedDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })}
              </time>
            )}
          </div>
          <a
            href={newsurl}
            target="_blank"
            rel="noreferrer noopener"
            className="story-card__read-link"
            aria-label={`Read full story: ${title}`}
          >
            Read story <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;
