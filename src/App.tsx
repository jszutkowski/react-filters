import * as React from 'react';
import './App.css';
import {Filters} from "./Filters/Filters";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Filters/>
      </div>
    );
  }
}

export default App;
