import React from "react";

import "./MusicStore.scss";

interface PlayItemProps {
  link?: string;
  thumbnail?: string;
  title?: string;
  onClick: () => void;
}

interface PlayListProps {
  children: React.ReactNode;
}

function PlayItem({ link, thumbnail, title, onClick }: PlayItemProps) {
  return (
    <li>
      <div className="play-list-thumbnail">
        <img src={`https://img.youtube.com/vi/${thumbnail}/maxresdefault.jpg`} alt="" />
      </div>
      <div className="play-list-info">
        <strong>{title}</strong>
        <p>
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      </div>
      <button type="button" className="button-remove" onClick={onClick}>
        삭제
      </button>
    </li>
  );
}

function PlayList({ children }: PlayListProps) {
  return <ul className="play-list">{children}</ul>;
}

export default PlayList;

PlayList.Item = PlayItem;
