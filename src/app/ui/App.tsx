import Comments from "@/widgets/Comments/ui/Comments";
import Header from "@/widgets/Header/ui/Header";
import { FC } from "react";
import "./App.scss";
import BtnShowComments from "@/components/btnShowComments/ui/BtnShowComments";

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <Comments />
      <BtnShowComments />
    </div>
  );
};

export default App;
