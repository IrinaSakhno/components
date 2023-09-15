import React from "react";
import moment from "moment";
import classNames from "classnames";
import "moment/locale/ru";
import "./Calendar.css";

const Calendar = () => {
  const months = [
    "ЯНВАРЯ",
    "ФЕВРАЛЯ",
    "МАРТА",
    "АПРЕЛЯ",
    "МАЯ",
    "ИЮНЯ",
    "ИЮЛЯ",
    "АВГУСТА",
    "СЕНТЯБРЯ",
    "ОКТЯБРЯ",
    "НОЯБРЯ",
    "ДЕКАБРЯ",
  ];
  moment().locale("ru");

  const daysInThisMonth = moment().daysInMonth();
  const daysInPreviousMonth = moment().subtract(1, "months").daysInMonth();
  const previousMonthDaysThisWeek = moment().startOf("month").weekday();

  const dates = [];
  // Добавляем даты предыдущего месяца в массив
  for (let i = 0; i < previousMonthDaysThisWeek; i++) {
    dates.unshift({date: daysInPreviousMonth - i, isOtherMonth: true});
  }
  // Добавляем даты текущего месяца в массив
  for (let i = 1; i < daysInThisMonth + 1; i++) {
    dates.push({date: i, isToday: i === moment().get("date")});
  }
  // Сколько всего недель необходимо в календаре
  const weeksNeeded = Math.ceil(dates.length / 7);
  // Считаем и добавляем даты следующего месяца в массив
  const daysNextMonthQuantity = weeksNeeded * 7 - dates.length;
  for (let i = 1; i < daysNextMonthQuantity + 1; i++) {
    dates.push({date: i, isOtherMonth: true});
  }

  // Массив с массивами дат по неделям
  const weeks = [];
  for (let i = 0; i < weeksNeeded; i++) {
    const index = i * 7;
    weeks.push(dates.slice(index, index + 7));
  }

  const renderDates = (weeks) => {
    return weeks.map((week) => {
      return (
        <tr>
          {week.map((day) => {
            return <td className={classNames(day.isOtherMonth && "ui-datepicker-other-month", day.isToday && "ui-datepicker-today")}>{day.date}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <>
      <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
          <div className="ui-datepicker-material-day">
            {moment.weekdays(moment().weekday())}
          </div>
          <div className="ui-datepicker-material-date">
            <div className="ui-datepicker-material-day-num">
              {moment().get("date")}
            </div>
            <div className="ui-datepicker-material-month">
              {months[moment().get("month")]}
            </div>
            <div className="ui-datepicker-material-year">
              {moment().get("year")}
            </div>
          </div>
        </div>
        <div className="ui-datepicker-header">
          <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">
              {moment().locale("ru").format("MMMM")}
            </span>
            &nbsp;
            <span className="ui-datepicker-year">{moment().get("year")}</span>
          </div>
        </div>
        <table className="ui-datepicker-calendar">
          <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col className="ui-datepicker-week-end"></col>
            <col className="ui-datepicker-week-end"></col>
          </colgroup>
          <thead>
            <tr>
              <th scope="col" title="Понедельник">
                Пн
              </th>
              <th scope="col" title="Вторник">
                Вт
              </th>
              <th scope="col" title="Среда">
                Ср
              </th>
              <th scope="col" title="Четверг">
                Чт
              </th>
              <th scope="col" title="Пятница">
                Пт
              </th>
              <th scope="col" title="Суббота">
                Сб
              </th>
              <th scope="col" title="Воскресенье">
                Вс
              </th>
            </tr>
          </thead>
          <tbody>
            {renderDates(weeks)}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
