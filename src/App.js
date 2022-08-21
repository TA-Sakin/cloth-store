import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home/home.component";
import Navigation from "./Routes/navigation/navigation.component";

const Shop = () => {
  return <h1>It's a shop</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  );
};

export default App;

