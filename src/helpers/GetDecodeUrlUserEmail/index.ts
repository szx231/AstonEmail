/* eslint-disable no-restricted-globals */
export const getDecodeUrlUserEmail = () => {
  const regex = /message\/(.+)/;
  const match = regex.exec(location.pathname);
  if (match && match[1]) {
    return match[1];
  }
  return '';
};
