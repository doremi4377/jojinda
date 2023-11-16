import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Button } from "../../reusable";

import "./MusicStore.scss";

function Comment() {
  const savedCommentList = JSON.parse(localStorage.getItem("commentItemData") || "[]");
  const savedEditCommentList = JSON.parse(localStorage.getItem("editedCommentItemData") || "");

  const [commentList, setCommentList] = useState<{ id: string; commentText: string }[]>(savedCommentList);
  const [form, setForm] = useState({ commentText: "" });

  const [editForm, setEditForm] = useState({ editCommentText: "" });
  const [isEditing, setEditing] = useState(false);
  const [editedCommentValue, setEditedCommentValue] = useState<{ editCommentText: string }>(savedEditCommentList);

  const [commentIndex, setCommentIndex] = useState(0);

  const { commentText } = form;
  const { editCommentText } = editForm;

  // 코멘트 입력 Form
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommentList = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(newCommentList);
  };

  // 코멘트 등록버튼 - 리스트 생성
  const handleOnClickSave = () => {
    const newCommentList = commentList.concat({ id: nanoid(10), ...form });
    setCommentList(newCommentList);
    setForm({
      commentText: "",
    });
  };

  //수정입력 버튼 눌렀을때 form 노출
  const handleOnEditForm = (id: string) => {
    const index = commentList.findIndex((item) => item.id === id);
    setEditing(true);
    setCommentIndex(index);
    console.log("수정");
  };

  // 수정입력 Form
  const handleOnEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommentList = {
      ...editForm,
      [e.target.name]: e.target.value,
    };

    setEditForm(() => ({
      ...newCommentList,
    }));
  };

  // 수정 후 등록 버튼
  const handleOnEditSave = (id: string) => {
    if (!editCommentText.length) {
      alert("코멘트를 등록해주어라!");
      return;
    }

    setEditing(false);

    const index = commentList.findIndex((item) => item.id === id);
    console.log("index", index);

    const editCommentItemData = JSON.parse(JSON.stringify(commentList)) as { id: string; commentText: string }[];
    console.log("a", editCommentItemData);

    editCommentItemData[index].commentText = editCommentText[index];

    setEditForm({ editCommentText: "" });
    setCommentList([...editCommentItemData]);
  };

  const handleOnRemove = (id: string) => {
    const newCommentList = commentList.filter((item) => item.id !== id);
    setCommentList(newCommentList);
  };

  useEffect(() => {
    localStorage.setItem("commentItemData", JSON.stringify(commentList));
    localStorage.setItem("editedCommentItemData", JSON.stringify(editedCommentValue));
  }, [commentList]);

  return (
    <div className="comment">
      <ul className="comment-list">
        {commentList.map(({ id, commentText }, index) => (
          <li key={id}>
            {isEditing && commentIndex === index ? (
              <textarea name="editCommentText" value={editCommentText} onChange={handleOnEditChange} />
            ) : (
              <div>{commentText}</div>
            )}
            <div className="comment-list-button">
              <button
                type="button"
                onClick={() => {
                  isEditing && commentIndex === index ? handleOnEditSave(id) : handleOnEditForm(id);
                }}
              >
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
