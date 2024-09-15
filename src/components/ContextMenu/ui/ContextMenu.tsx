import { FC, useEffect, useRef, useState } from "react";
import "./ContextMenu.scss";
import complainSvg from "@/shared/assets/contextMenu/complain.svg";
import blackListSvg from "@/shared/assets/contextMenu/blackList.svg";
import copySvg from "@/shared/assets/contextMenu/copy.svg";
import linkSvg from "@/shared/assets/contextMenu/link.svg";
import pinSvg from "@/shared/assets/contextMenu/pin.svg";
import unbanSvg from "@/shared/assets/contextMenu/unban.svg";
import deleteSvg from "@/shared/assets/contextMenu/delete.svg";
import banSvg from "@/shared/assets/contextMenu/ban.svg";
import pinnedSvg from "@/shared/assets/contextMenu/pinned.svg";
import spinnerSvg from "@/shared/assets/contextMenu/spinner.svg";

interface ContextMenuProps {
  isBanned: boolean;
  handleBanned: () => void;
  isPinned: boolean;
  handlePinned: () => void;
  isOpenMenu: boolean;
  handleOpen: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({
  isBanned,
  handleBanned,
  isPinned,
  handlePinned,
  handleOpen,
}) => {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedText, setIsCopiedText] = useState(false);
  const [isBlackList, setIsBlackList] = useState(false);
  const [isComplain, setIsComplain] = useState(false);
  const contextMenuRef = useRef<HTMLUListElement | null>(null);

  const handleCopiedLink = () => {
    setIsCopiedLink(true);
    setTimeout(() => {
      setIsCopiedLink(false);
    }, 500);
  };

  const handleCopiedText = () => {
    setIsCopiedText(true);
    setTimeout(() => {
      setIsCopiedText(false);
    }, 500);
  };

  const handleBlackList = () => {
    setIsBlackList(true);
    setTimeout(() => {
      setIsBlackList(false);
    }, 500);
  };

  const handleComplain = () => {
    setIsComplain(true);
    setTimeout(() => {
      setIsComplain(false);
    }, 500);
  };
  const Loading = <img className="contextMenu_spinner" src={spinnerSvg} />;

  const handleBlur = (event: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as Node)
    ) {
      handleOpen();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);

    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  }, []);

  return (
    <aside className="contextMenu">
      <ul ref={contextMenuRef} className="contextMenu_list">
        <li onClick={handleComplain}>
          {isComplain ? Loading : <img src={complainSvg} />}
          <span> Пожаловаться</span>
        </li>
        <li onClick={handleBlackList}>
          {isBlackList ? Loading : <img src={blackListSvg} />}
          <span>Добавить в черный список</span>
        </li>
        <li onClick={handleCopiedText}>
          {isCopiedText ? Loading : <img src={copySvg} />}
          <span>Скопировать текст</span>
        </li>
        <li onClick={handleCopiedLink}>
          {isCopiedLink ? Loading : <img src={linkSvg} />}
          <span>Скопировать ссылку</span>
        </li>
        <li onClick={handlePinned}>
          {isPinned ? (
            <>
              <img src={pinnedSvg} />
              <span>Открепить комментарий</span>
            </>
          ) : (
            <>
              <img src={pinSvg} />
              <span>Закрепить комментарий</span>
            </>
          )}
        </li>
        <li onClick={handleBanned}>
          {isBanned ? (
            <>
              <img src={unbanSvg} />
              <span>Разбанить пользователя</span>
            </>
          ) : (
            <>
              <img src={banSvg} />
              <span style={{ color: "red" }}>Забанить пользователя</span>
            </>
          )}
        </li>
        <li>
          <img className="contextMenu_deleteImg" src={deleteSvg} />
          <span className="contextMenu_deleteText">Удалить комментарий</span>
        </li>
      </ul>
    </aside>
  );
};
export default ContextMenu;
