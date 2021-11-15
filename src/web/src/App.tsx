import { BrowserRouter as Router } from "react-router-dom";

import MainLayoutContainer from "./components/UI/Layout/MainLayoutContainer";

function App() {
  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <MainLayoutContainer />
    </Router>
  );
}

export default App;

// useEffect(() => {
//   const events = getEvents();
//   console.log(events);
// }, []);

// const apiClickHandler = () => {
//   const events = getEvents();
//   console.log(events);
// };
