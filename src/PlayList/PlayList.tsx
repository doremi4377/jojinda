import React, { useState } from "react";

import "./PlayList.scss";

function PlayList() {
  const [names, setNames] = useState<{ id: number; title: string; link: string }[]>([]);
  const [inputText, setInputText] = useState({
    title: "",
    link: "",
  });
  const [nextId, setNextId] = useState(0);

  const { title, link } = inputText;

  const onChange = (e: any) => {
    const nextForm = {
      ...inputText,
      [e.target.name]: e.target.value,
    };
    setInputText(nextForm);
  };

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      ...inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText({
      title: "",
      link: "",
    });
  };

  const onRemove = (id: number) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };
  return (
    <div className="test">
      PlayList
      <div>
        {names.map(({ id, title, link }) => (
          <div key={id}>
            <div key={id}>
              <div>
                {title} / {link}
                <button type="button" onClick={() => onRemove(id)}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>
          <label>노래입력</label>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div>
          <label>유투브 링크 입력</label>
          <input type="text" name="link" value={link} onChange={onChange} />
        </div>
        <button type="button" onClick={onClick} disabled={title.length <= 0 && title.length <= 0}>
          추가
        </button>
      </div>
    </div>
  );
}

export default PlayList;
