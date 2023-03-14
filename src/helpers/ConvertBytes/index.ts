export const convertBytes = (x: string) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++index) {
    n /= 1024;
  }

  return `${n.toFixed(n < 10 && index > 0 ? 1 : 0)} ${units[index]}`;
};
