import { useState } from 'react';

export const useToggleTheme = (initialState: string) => {
  const [value, setValue] = useState(initialState);

  const toggle = () => {
    setValue(value === 'светлая' ? 'тёмная' : 'светлая');
  };

  return [value, toggle];
};
