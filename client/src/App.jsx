import { Header, Navbar } from "./components";
import Router from "./Router";

const App = () => {
  return (
    <div className="h-dvh">
      <Header />
      <div className="h-[82dvh] overflow-auto">
        <Router />
      </div>
      <Navbar />
    </div>
  );
};

export default App;
