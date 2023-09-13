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
  const [isShow, setIsShow] = useState(false);

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

      const videoIdFromURI = targetUrl.searchParams.get("v");
      console.log(targetUrl.searchParams.get("v"));

      //2. 'v=' key가 있는가?
      if (!videoIdFromURI) {
        alert("?v= 링크형태를 입력해주어라!");
        return;
      }

      const nextPlayList = playList.concat({ id: nanoid(10), thumbnail: videoIdFromURI, ...form });
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

  return (
    <main className="music-store">
      <section className="play-view">
        <h2>TODO: 플레이 되는 영역</h2>
      </section>

      <section className="play-list-control">
        <Button size="small" theme="grey" onClick={() => setIsShow(true)}>
          +추가
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
            <button type="button" className="modal-close" onClick={() => setIsShow(false)}>
              x
            </button>
          </Form>
        )}

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
