import React from "react";
import moment from 'moment';
import "./components/Calendar/Calendar.css";
import Calendar from "./components/Calendar/Calendar";

function App() {
  moment.locale('ru');
  return <Calendar />;
}

export default App;
