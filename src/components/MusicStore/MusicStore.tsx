import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Button, Form, TextField } from "../../reusable";
import PlayList from "./PlayList";

import "./MusicStore.scss";
import PlayView from "./PlayView";
import classNames from "classnames";

function MusicStore() {
  const savedPlayList = JSON.parse(localStorage.getItem("playListData") || "[]");

  const [playList, setPlayList] = useState<{ id: string; title: string; thumbnail: string; link: string }[]>(savedPlayList);
  const [form, setForm] = useState({
    title: "",
    link: "",
  });
  const [isShow, setIsShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { title, link } = form;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPlayList = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextPlayList);
  };

  const handleOnClickSave = () => {
    try {
      const targetUrl = new URL(link);

      //1. 유투브 도메인인가?
      if (targetUrl.host.indexOf("youtube") < 0 && targetUrl.host.indexOf("youtu.be") < 0) {
        alert("유투브가 아니어라!");
        return;
      }

      const videoIdFromParams = targetUrl.searchParams.get("v");

      //2. 'v=' key가 있는가?
      if (!videoIdFromParams) {
        alert("?v= 링크형태를 입력해주어라!");
        return;
      }

      const nextPlayList = playList.concat({ id: nanoid(10), thumbnail: videoIdFromParams, ...form });
      setPlayList(nextPlayList);
      setForm({
        title: "",
        link: "",
      });
    } catch (e) {
      alert("올바르지 않는 URL이어라!");
    }
  };

  const handleOnRemove = (id: string) => {
    const nextPlayList = playList.filter((item) => item.id !== id);
    setPlayList(nextPlayList);
  };

  useEffect(() => {
    // playList가 변경되면, localStorage에 다시 저장한다.
    localStorage.setItem("playListData", JSON.stringify(playList));
  }, [playList]);

  //PlayView 에 넣을 현재 선택한 리스트 링크/타이틀을 가져온다.
  const activeTitle = playList[activeIndex].title;

  const activeLink = playList[activeIndex].link;
  const activeVideoURL = new URL(activeLink);
  const activeVideoIdFromParams = activeVideoURL.searchParams.get("v");

  return (
    <main className="music-store">
      <section className="play-view">
        <PlayView link={activeVideoIdFromParams} title={activeTitle} />
      </section>

      <section className="play-list-control">
        <Button size="large" theme="outline" onClick={() => setIsShow(true)}>
          🎶 내가 즐겨 듣는 음악 추가 +
        </Button>
        {isShow && (
          <Form className="play-list-resister">
            <Form.Item label="노래 제목">
              <TextField placeholder="노래제목을 입력해주세요." name="title" value={title} onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="유투브 링크">
              <TextField placeholder="유투브 링크를 입력해주세요." name="link" value={link} onChange={handleOnChange} />
            </Form.Item>
            <Button disabled={!title.length && !link.length} onClick={handleOnClickSave}>
              저장
            </Button>
            <Button size="small" theme="grey" className="button-modal-close" onClick={() => setIsShow(false)}>
              X
            </Button>
          </Form>
        )}

        <PlayList>
          {playList.map(({ id, title, thumbnail, link }, index) => (
            <PlayList.Item
              className={classNames({ active: index === activeIndex })}
              key={id}
              title={title}
              thumbnail={thumbnail}
              link={link}
              onClickRemove={() => handleOnRemove(id)}
              onClickItem={(e: React.MouseEvent<HTMLButtonElement>) => {
                setActiveIndex(index);
                e.stopPropagation();
              }}
            />
          ))}
        </PlayList>
      </section>
    </main>
  );
}

export default MusicStore;
