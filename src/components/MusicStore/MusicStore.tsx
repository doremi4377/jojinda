import React, { useState } from "react";
import { Button, Form, TextField } from "../../reusable";
import PlayList from "./PlayList";

import "./MusicStore.scss";

function MusicStore() {
  const [playList, setPlayList] = useState<{ title: string; link: string }[]>([]);
  const [form, setForm] = useState({
    title: "",
    link: "",
  });

  const { title, link } = form;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const handleOnClick = () => {
    const nextForm = playList.concat({ ...form });
    setPlayList(nextForm);
    setForm({
      title: "",
      link: "",
    });
  };

  const handleOnRemove = (title: string) => {
    const nextNames = playList.filter((item) => item.title !== title);
    setPlayList(nextNames);
  };

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
          {playList.map(({ title, link }, index) => (
            <PlayList.Item key={`playList-${index}`} title={title} link={link} onClick={() => handleOnRemove(title)} />
          ))}
        </PlayList>
      </section>
    </main>
  );
}

export default MusicStore;
