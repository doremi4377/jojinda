import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Button, Form, TextField } from "../../reusable";
import PlayList from "./PlayList";

import "./MusicStore.scss";

function MusicStore() {
  const savedPlayList = JSON.parse(localStorage.getItem("playListData") || "[]");

  const [playList, setPlayList] = useState<{ id: string; title: string; thumbnail: string; link: string }[]>(savedPlayList);
  const [form, setForm] = useState({
    title: "",
    link: "",
  });

  const { title, link } = form;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextPlayList = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextPlayList);
  };

  const handleOnClick = () => {
    const videoIdFromURI = link.split("?v=").length > 1 ? link.split("?v=")[1].split("&")[0] : "";

    const nextPlayList = playList.concat({ id: nanoid(10), thumbnail: videoIdFromURI, ...form });
    setPlayList(nextPlayList);
    setForm({
      title: "",
      link: "",
    });
  };

  const handleOnRemove = (id: string) => {
    const nextPlayList = playList.filter((item) => item.id !== id);
    setPlayList(nextPlayList);
  };

  useEffect(() => {
    // playList가 변경되면, localStorage에 다시 저장한다.
    localStorage.setItem("playListData", JSON.stringify(playList));
  }, [playList]);

  return (
    <main className="music-store">
      <section className="play-view">
        <h2>TODO: 플레이 되는 영역</h2>
      </section>

      <section className="play-list-control">
        <Form className="play-list-resister">
          <Form.Item label="노래 제목">
            <TextField placeholder="노래제목을 입력해주세요." name="title" value={title} onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="유투브 링크">
            <TextField placeholder="유투브 링크를 입력해주세요." name="link" value={link} onChange={handleOnChange} />
          </Form.Item>
          <Button onClick={handleOnClick} disabled={!title.length && !link.length}>
            추가
          </Button>
        </Form>

        <PlayList>
          {playList.map(({ id, title, thumbnail, link }) => (
            <PlayList.Item key={id} title={title} thumbnail={thumbnail} link={link} onClick={() => handleOnRemove(id)} />
          ))}
        </PlayList>
      </section>
    </main>
  );
}

export default MusicStore;
