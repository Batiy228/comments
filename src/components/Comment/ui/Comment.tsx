import { FC, useState } from "react";
import "./Comment.scss";
import { CommentType } from "@/shared/@types/CommentType";
import ParentComment from "../../ParentComment/ui/ParentComment";
import ContextMenu from "@/components/ContextMenu/ui/ContextMenu";
import pinSvg from "@/shared/assets/pinComm.svg";
import { getRating } from "@/shared/helper/rating";
import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import InputForReply from "@/components/InputForReply/ui/InputForReply";

const Comment: FC<CommentType> = ({
  id,
  text,
  published,
  author,
  rating,
  parentComment,
}) => {
  const [activeBtn, setActiveBtn] = useState<"+" | "-" | "">("");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isActiveReply, setIsActiveReply] = useState(false);

  const handleClickRating = (el: "+" | "-" | "") => {
    if (activeBtn === el) {
      setActiveBtn("");
    } else {
      setActiveBtn(el);
    }
  };

  const handleOpen = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const handleBanned = () => {
    setIsBanned((prev) => !prev);
  };

  const handlePinned = () => {
    setIsPinned((prev) => !prev);
  };

  const ratingTotal = getRating(rating.plus, rating.minus, activeBtn);

  const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      boxShadow: theme.shadows[5],
    },
  }));

  const handleActiveReply = () => {
    setIsActiveReply((prev) => !prev);
  };

  return (
    <article className={`comment ${isBanned ? "banned" : ""}`}>
      {isPinned && (
        <>
          <img src={pinSvg} />
          <span className="comment_pin">Закреплено Sports.ru</span>
        </>
      )}
      <header className="comment_header">
        <section className="comment_user">
          <img
            src={author.picture.url}
            className="comment_avatar"
            alt="avatar"
          />
          <div className="comment_user-info">
            <h3 className="comment_username">
              {isBanned ? "Пользователь заблокирован" : author.nick}
            </h3>
            <time className="comment_time">{published.bunin}</time>
          </div>
        </section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ height: "1rem" }}>
            <span className="comment_options" onClick={handleOpen}>
              ...
            </span>
          </div>
        </div>
      </header>
      {parentComment && (
        <ParentComment key={parentComment.id} {...parentComment} />
      )}
      <p className="comment_body">{text}</p>

      {!isBanned && (
        <>
          <footer className="comment_actions">
            <button
              onClick={handleActiveReply}
              className="comment_reply-button"
            >
              ОТВЕТИТЬ
            </button>
            <section className="comment_vote">
              <button
                className={`comment_vote-up ${
                  activeBtn === "+" ? "active" : ""
                }`}
                onClick={() => handleClickRating("+")}
              >
                +
              </button>
              <BootstrapTooltip
                placement="top"
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      style={{
                        color: "#00a876",
                        fontWeight: "bold",
                        width: "2rem",
                        textAlign: "center",
                      }}
                    >
                      +{rating.plus}
                    </Typography>
                    <div
                      style={{
                        height: "1.5rem",
                        width: "1px",
                        backgroundColor: "#eaeaea",
                        margin: "0 1rem",
                      }}
                    />
                    <Typography
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        width: "2rem",
                        textAlign: "center",
                      }}
                    >
                      -{rating.minus}
                    </Typography>
                  </div>
                }
                arrow
              >
                <span className="comment_vote-count">{ratingTotal}</span>
              </BootstrapTooltip>
              <button
                className={`comment_vote-down ${
                  activeBtn === "-" ? "active" : ""
                }`}
                onClick={() => handleClickRating("-")}
              >
                –
              </button>
            </section>
          </footer>
          {isActiveReply && (
            <InputForReply author={author} repliedText={text} id={id} />
          )}
        </>
      )}

      {isOpenMenu && (
        <ContextMenu
          isBanned={isBanned}
          handleBanned={handleBanned}
          isPinned={isPinned}
          handlePinned={handlePinned}
          handleOpen={handleOpen}
          isOpenMenu={isOpenMenu}
        />
      )}
    </article>
  );
};

export default Comment;
