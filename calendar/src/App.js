import React from "react";
import moment from "moment";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";

function App() {
  moment.locale("ru");
  return <Calendar />;
}

export default App;
