import { ChangeEvent, FC, useState } from "react";
import donateSvg from "@/shared/assets/donate.svg";
import addFileSvg from "@/shared/assets/addFile.svg";
import addImgSvg from "@/shared/assets/addImg.svg";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { addComment } from "@/widgets/Comments/model/commentsSlice";
import "./InputForReply.scss";
import { Author } from "@/shared/@types/Author";

interface InputforReplyProps {
  id: string;
  author: Author;
  repliedText: string;
}

const InputForReply: FC<InputforReplyProps> = ({ author, repliedText, id }) => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  const handleAddReply = () => {
    if (value.trim() !== "") {
      dispatch(addComment({ value, author, repliedText, id }));
      setValue("");
    }
  };

  return (
    <div className="input-reply">
      <div className="input-reply_input-block">
        <textarea
          className="expanded"
          onChange={(e) => handleChangeValue(e)}
          value={value}
          placeholder="Написать комментарий..."
        ></textarea>
        <div className="input-reply_icons">
          <button>
            <img src={donateSvg} alt="donate" />
          </button>
          <button>
            <img src={addFileSvg} alt="addFile" />
          </button>
          <button>
            <img src={addImgSvg} alt="addImg" />
          </button>
        </div>
      </div>
      <footer className={`input-reply_footer `}>
        <div>
          <span>Пишите корректно и дружелюбно. </span>
          <a
            target="_blank"
            href="https://www.sports.ru/football/blogs/2792305.html"
          >
            Принципы нашей модерации
          </a>
        </div>
        <button
          className={`input-reply_add ${value.trim() ? "filled" : ""}`}
          onClick={handleAddReply}
        >
          ОТПРАВИТЬ
        </button>
      </footer>
    </div>
  );
};

export default InputForReply;
