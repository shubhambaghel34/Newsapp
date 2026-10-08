import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import News from "./components/news";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";

function App() {
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState("us");
  return (
    <div>
      <Router>
        <LoadingBar color="#f11946" progress={progress} height="2" />
        <Navbar country={country} onCountryChange={setCountry} />

        {/* <News setProgress={setProgress} pagesize={5} country="us" category="science"/> */}
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              key="general"
              pagesize={5}
              country={country}
              category="general"
            />
          </Route>
          <Route exact path="/business">
            <News
              setProgress={setProgress}
              key="business"
              pagesize={5}
              country={country}
              category="business"
            />
          </Route>

          <Route exact path="/science">
            <News
              setProgress={setProgress}
              key="science"
              pagesize={5}
              country={country}
              category="science"
            />
          </Route>
          <Route exact path="/technology">
            <News
              setProgress={setProgress}
              key="technology"
              pagesize={5}
              country={country}
              category="technology"
            />
          </Route>

          <Route exact path="/entertainment">
            <News
              setProgress={setProgress}
              key="entertainment"
              pagesize={5}
              country={country}
              category="entertainment"
            />
          </Route>
          <Route exact path="/health">
            <News
              setProgress={setProgress}
              key="health"
              pagesize={5}
              country={country}
              category="health"
            />
          </Route>
          <Route exact path="/sports">
            <News
              setProgress={setProgress}
              key="sports"
              pagesize={5}
              country={country}
              category="sports"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
