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
  const lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
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

  const wd1 = date1.split(" ").slice(0, 1)[0];
  const wd2 = date2.split(" ").slice(0, 1)[0];
  const day1 = date1.split(" ").slice(2, 3)[0];
  const day2 = date2.split(" ").slice(2, 3)[0];
  const h1 = date1.split(" ").slice(4, 5)[0].split(":")[0];
  const h2 = date2.split(" ").slice(4, 5)[0].split(":")[0];
  const m1 = date1.split(" ").slice(4, 5)[0].split(":")[1];
  const m2 = date2.split(" ").slice(4, 5)[0].split(":")[1];

  const minutes1 = 60 - Number(m1);
  const minutes2 = 60 - Number(m2);

  console.log(minutes1, minutes2, (minutes1 + minutes2) % 60);

  if (Number(day1) == Number(day2)) {
    return {
      hours: Number(h2) - Number(h1),
      min: (minutes1 + minutes2) % 60,
      day: wd2,
    };
  } else {
    return {
      hours: 24 - Number(h1) + Number(h2),
      min: (minutes1 + minutes2) % 60,
      day: wd2,
    };
  }
};

export const helper = (time) => {
  var hours =
    time.getHours() == 0
      ? "12"
      : time.getHours() > 12
      ? time.getHours() - 12
      : time.getHours();
  var minutes = (time.getMinutes() < 10 ? "0" : "") + time.getMinutes();
  var ampm = time.getHours() < 12 ? "AM" : "PM";
  var formattedTime = hours + ":" + minutes + " " + ampm;
  return formattedTime;
};
