import withDialogesSvg from "@/shared/assets/withDialogs.svg";
import sortByDateSvg from "@/shared/assets/sortByDate.svg";
import spinnerHeaderSvg from "@/shared/assets/spinnerHeader.svg";
import "./Header.scss";
import { useState } from "react";

const Header = () => {
  const [filter, setFilter] = useState("best");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (value: "date" | "best" | "actual") => {
    setFilter(value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <header className="header">
      <span>56 комментариев</span>
      <nav className="header_nav">
        <div>
          <button
            className={`btn-with-img ${filter === "date" ? "active" : ""} ${
              filter === "date" && isLoading ? "loading" : ""
            }`}
            onClick={() => handleClick("date")}
          >
            <span className="text">
              ПО ДАТЕ
              <img className="icon" src={sortByDateSvg} />
            </span>
            <span>
              <img className="spinner" src={spinnerHeaderSvg} />
            </span>
          </button>
          <button
            className={`${filter === "best" ? "active" : ""} ${
              filter === "best" && isLoading ? "loading" : ""
            }`}
            onClick={() => handleClick("best")}
          >
            <span className="text">ЛУЧШИЕ</span>
            <img className="spinner" src={spinnerHeaderSvg} alt="spinner" />
          </button>
          <button
            className={`${filter === "actual" ? "active" : ""} ${
              filter === "actual" && isLoading ? "loading" : ""
            }`}
            onClick={() => handleClick("actual")}
          >
            <span className="text">АКТУАЛЬНЫЕ</span>
            <img className="spinner" src={spinnerHeaderSvg} />
          </button>
        </div>
        <button className="btn-with-img">
          С диалогами <img className="icon" src={withDialogesSvg} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
