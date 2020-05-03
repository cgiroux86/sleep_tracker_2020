export const formatDate = (date) => {
  let d = new Date(date),
    month = `${d.getMonth() + 1}`,
    day = `${d.getDate()}`,
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day}`;
};

export const getWeeksInMonth = (month, year) => {
  var weeks = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  var start = 1;
  var end = 7 - firstDate.getDay();
  while (start <= numDays) {
    weeks.push({ start: start, end: end });
    start = end + 1;
    end = end + 7;
    if (end > numDays) end = numDays;
  }
  return weeks;
};
export const getWeek = (date = Date.now()) => {
  const dToday = new Date(date); // current date of week
  const currentWeekDay = dToday.getDay();
  const lessDays = Number(currentWeekDay) === 0 ? 6 : currentWeekDay - 1;
  const wkStart = new Date(
    new Date(dToday).setDate(dToday.getDate() - lessDays)
  );
  const wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));

  return [wkStart, wkEnd];
};

export const getTotalWeeks = () => {
  let arr = [];
  getWeeksInMonth(new Date().getMonth(), new Date().getFullYear()).map(
    (_, i) => {
      let multiplier = i * 7;
      arr.push(
        getWeek(
          new Date(new Date().getTime() - multiplier * 24 * 60 * 60 * 1000)
        )
      );
    }
  );
  return arr;
};

export const getHours = (d1, d2) => {
  const date1 = `${new Date(d1)}`;
  const date2 = `${new Date(d2)}`;

  const wd2 = date2.split(" ").slice(0, 1)[0];

  const diff = new Date(d2).getTime() - new Date(d1).getTime();

  let msec = diff;
  let hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  let mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  let ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return {
    hours: hh,
    min: mm,
    day: wd2,
  };
};

export const helper = (time) => {
  let hours =
    Number(time.getHours()) === 0
      ? "12"
      : time.getHours() > 12
      ? time.getHours() - 12
      : time.getHours();
  let minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  let ampm = time.getHours() < 12 ? "AM" : "PM";
  let formattedTime = hours + ":" + minutes + " " + ampm;
  return formattedTime;
};

export const sleepCalculator = (arr, t1, t2) => {
  arr.reduce(
    (a, b) =>
      new Date(a.sleep_start).getTime() - new Date(a).getTime() + new Date(b)
  );
};
