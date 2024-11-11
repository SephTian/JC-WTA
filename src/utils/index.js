const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const showFormattedTimeCount = (date) => {
  const now = new Date();
  const inputDate = new Date(date);
  const SECOND = 1000;
  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const timeDifferenceInSecond = Math.floor((now.getTime() - inputDate.getTime()) / SECOND);
  if (timeDifferenceInSecond <= 60) {
    return `${Math.floor(timeDifferenceInSecond) + 1} detik`;
  } else if (timeDifferenceInSecond <= HOUR) {
    return `${Math.floor(timeDifferenceInSecond / MINUTE)} menit`;
  } else if (timeDifferenceInSecond <= DAY) {
    return `${Math.floor(timeDifferenceInSecond / HOUR)} jam`;
  }

  return `${Math.floor(timeDifferenceInSecond / DAY)} hari`;
};

export { showFormattedDate, showFormattedTimeCount };
