const month = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

export const messageSentToday = (date: string) => {
  const currentDay = Date.now();
  const messageDate = Date.parse(date);
  const millisecondInDay = 24 * 60 * 60 * 1000;

  if (currentDay - messageDate > millisecondInDay) {
    const messageSentDay = new Date(messageDate).getDate();
    const messageSentMonth = new Date(messageDate).getMonth();
    return `${messageSentDay} ${month[messageSentMonth]}`;
  }

  const messageSentHours = new Date(date).getHours();
  const messageSentMinutes = new Date(date).getMinutes();

  return `${messageSentHours}: ${messageSentMinutes}`;
};
