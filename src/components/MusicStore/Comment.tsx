import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Button } from "../../reusable";

import "./MusicStore.scss";

function Comment() {
  const savedCommentList = JSON.parse(localStorage.getItem("commentListData") || "[]");

  const [commentList, setCommentList] = useState<{ id: string; commentText: string }[]>(savedCommentList);
  const [form, setForm] = useState({ commentText: "" });
  const [isEditing, setEditing] = useState(false);
  const [editedCommentList, setEditedCommentList] = useState({ commentText: "" });

  const { commentText } = form;

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommentList = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newCommentList);
  };

  const handleOnClickSave = () => {
    const newCommentList = commentList.concat({ id: nanoid(10), ...form });
    setCommentList(newCommentList);
    setForm({
      commentText: "",
    });
  };

  const handleOnEdit = (id: string) => {
    setEditing((state) => !state);
    const newCommentList = commentList.find((item) => item.id === id);

    setEditedCommentList((prev) => ({
      ...prev,
      ...newCommentList,
    }));

    console.log("newCommentList", newCommentList);
  };

  const handleOnEditChange = () => {
    //TODO
    console.log("a");
  };

  const handleOnRemove = (id: string) => {
    const newCommentList = commentList.filter((item) => item.id !== id);
    console.log("newCommentList", id);
    setCommentList(newCommentList);
  };

  useEffect(() => {
    localStorage.setItem("commentListData", JSON.stringify(commentList));
  }, [commentList]);

  return (
    <div className="comment">
      <ul className="comment-list">
        {commentList.map(({ id, commentText }) => (
          <li key={id}>
            {isEditing ? (
              <textarea name="editedCommentText" value={editedCommentList.commentText} onChange={handleOnEditChange} />
            ) : (
              <div>{commentText}</div>
            )}
            <div className="comment-list-button">
              <button type="button" onClick={() => handleOnEdit(id)}>
                {isEditing ? "등록" : "수정"}
              </button>

              <span>|</span>
              <button type="button" onClick={() => handleOnRemove(id)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="comment-text-area">
        <textarea placeholder="코멘트를 입력해주세요." name="commentText" value={commentText} onChange={handleOnChange} />
      </div>
      <Button size="large" theme="outline" onClick={handleOnClickSave}>
        코멘트 등록
      </Button>
    </div>
  );
}

export default Comment;
