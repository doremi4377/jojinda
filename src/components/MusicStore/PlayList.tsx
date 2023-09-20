import React from "react";
import iconDelete from "../../assets/images/icon-remove.png";

import "./MusicStore.scss";

interface PlayItemProps {
  className?: string;
  link?: string;
  thumbnail?: string;
  title?: string;
  onClickItem?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickRemove: () => void;
}

interface PlayListProps {
  children: React.ReactNode;
}

function PlayItem({ className, link, thumbnail, title, onClickItem, onClickRemove }: PlayItemProps) {
  return (
    <li className={className}>
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
      <button type="button" className="button-item" onClick={onClickItem} aria-label="해당 play 재생으로 이동" />
      <button type="button" className="button-remove" onClick={onClickRemove}>
        <img src={iconDelete} alt="삭제" />
      </button>
    </li>
  );
}

function PlayList({ children }: PlayListProps) {
  return <ul className="play-list">{children}</ul>;
}

export default PlayList;

PlayList.Item = PlayItem;
