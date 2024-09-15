import { FC } from "react";
import "./ParentComment.scss";
import { ParentCommentType } from "@/shared/@types/ParentCommentType";

const ParentComment: FC<ParentCommentType> = ({ text, author }) => {
  return (
    <article className="parent-comment">
      <header className="parent-comment_header">
        Ответ
        <h4 className="parent-comment_username">{author.nick}</h4>
      </header>
      <main className="parent-comment_body">
        <p>{text}</p>
      </main>
    </article>
  );
};

export default ParentComment;
