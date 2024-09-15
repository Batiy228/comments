import { useState } from "react";
import "./BtnShowComments.scss";
import btnShowCommSvg from "@/shared/assets/spinnerBtnShowComm.svg";

const BtnShowComments = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <button
      className={`showComments ${isLoading ? "loading" : ""}`}
      onClick={handleClick}
    >
      <span className="text">ПОКАЗАТЬ ВСЕ КОММЕНТАРИИ</span>
      <img className="spinner" src={btnShowCommSvg} />
    </button>
  );
};

export default BtnShowComments;
