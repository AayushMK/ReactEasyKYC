import logo from './logo.svg';
import './App.css';
import axios from "axios";
import Form from "./container/form" 

function App() {
  return (
    <div className="App">
      {/* <div className="form" >
      <h2>Form</h2>
      <form method="POST">
        
        <div className="input">
        <input name="name" placeholder="Name"/><br/>
        </div>
        <div className="input">
      <input name = "address" placeholder="Address"/><br/>
        </div>
        <button type="submit">
          save
        </button>
      </form>
      </div>
       */}
       <Form/>
    </div>
  );
}

export default App;
