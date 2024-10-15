import "./App.css";
import { Github } from "./components/Github/Github";
import { Titles } from "./components/Titles/Titles";

function App() {
  return (
    <div className="wrapper">
      <Titles />
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
      <Github />
    </div>
  );
}

export default App;
