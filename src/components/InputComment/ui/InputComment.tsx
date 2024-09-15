import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import donateSvg from "@/shared/assets/donate.svg";
import addFileSvg from "@/shared/assets/addFile.svg";
import addImgSvg from "@/shared/assets/addImg.svg";
import "./InputComment.scss";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { addComment } from "@/widgets/Comments/model/commentsSlice";

const InputComment: FC = () => {
  const [value, setValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputBlockRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  const handleAddComm = () => {
    if (value.trim() !== "") {
      dispatch(addComment({ value }));
      setValue("");
      setIsExpanded(false);
    }
  };
  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = (event: MouseEvent) => {
    if (
      inputBlockRef.current &&
      !inputBlockRef.current.contains(event.target as Node) &&
      textAreaRef.current?.value.trim() === ""
    ) {
      if (value.trim() === "") {
        setIsExpanded(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleBlur);

    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  return (
    <div ref={inputBlockRef} className="input-comment">
      <div className="input-comment_input-block">
        <textarea
          ref={textAreaRef}
          className={isExpanded ? "expanded" : ""}
          onClick={handleFocus}
          onChange={(e) => handleChangeValue(e)}
          value={value}
          placeholder="Написать комментарий..."
        ></textarea>
        <div className="input-comment_icons">
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
      <footer
        className={`input-comment_footer ${isExpanded ? "expanded" : ""}`}
      >
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
          className={`input-comment_add ${value.trim() ? "filled" : ""}`}
          onClick={handleAddComm}
        >
          ОТПРАВИТЬ
        </button>
      </footer>
    </div>
  );
};

export default InputComment;
