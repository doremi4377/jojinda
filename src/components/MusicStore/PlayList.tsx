import React from "react";
import { Button } from "../../reusable";

import "./MusicStore.scss";

interface PlayItemProps {
  link?: string;
  title?: string;
  onClick: () => void;
}

interface PlayListProps {
  children: React.ReactNode;
}

function PlayItem({ link, title, onClick }: PlayItemProps) {
  return (
    <li>
      {/* TODO: 추후에 썸네일 추가 */}
      {/* <div className="play-list-thumbnail">썸네일</div> */}
      <div className="play-list-info">
        <strong>{title}</strong>
        <p>
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </p>
      </div>
      <Button className="button-remove" size="small" theme="grey" onClick={onClick}>
        X
      </Button>
    </li>
  );
}

function PlayList({ children }: PlayListProps) {
  return <ul className="play-list">{children}</ul>;
}

export default PlayList;

PlayList.Item = PlayItem;
