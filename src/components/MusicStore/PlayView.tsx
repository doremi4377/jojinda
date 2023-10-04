import React from "react";

import Comment from "./Comment";

import "./MusicStore.scss";

interface PlayViewProps {
  link?: string | null;
  title?: string;
}

function PlayView({ link, title }: PlayViewProps) {
  return (
    <>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${link}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <h2 className="play-view-title">{title}</h2>
      <Comment />
    </>
  );
}

export default PlayView;
