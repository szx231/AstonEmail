import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from '../../../assets/MessageCategories/icon.svg';
import { ReactComponent as Icon1 } from '../../../assets/MessageCategories/icon1.svg';
import { ReactComponent as Icon2 } from '../../../assets/MessageCategories/icon2.svg';
import { ReactComponent as Icon3 } from '../../../assets/MessageCategories/icon3.svg';
import { ReactComponent as Icon4 } from '../../../assets/MessageCategories/icon4.svg';
import { ReactComponent as Icon5 } from '../../../assets/MessageCategories/icon5.svg';
import { ReactComponent as Icon6 } from '../../../assets/MessageCategories/icon6.svg';
import { Items, Item, Text } from './styled';

import { changeIndexCategory, changeCurrentCategory } from '../../../store/CurrentCategory';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectCategory } from '../../../store/Selectors';

const iconCategoriesColor = 'var(--text-color)';

const Categories = [
  { category: 'Входящие', image: <Icon fill={iconCategoriesColor} /> },
  { category: 'Важное', image: <Icon1 fill={iconCategoriesColor} /> },
  { category: 'Отправленные', image: <Icon2 fill={iconCategoriesColor} /> },
  { category: 'Черновики', image: <Icon3 fill={iconCategoriesColor} /> },
  { category: 'Архив', image: <Icon4 fill={iconCategoriesColor} /> },
  { category: 'Спам', image: <Icon5 fill={iconCategoriesColor} /> },
  { category: 'Корзина', image: <Icon6 fill={iconCategoriesColor} /> },
];

export const MessageCategories = () => {
  const dispatch = useAppDispatch();
  const { categoryIndex } = useAppSelector(selectCategory);

  return (
    <Items>
      {Categories.map((el, index) => {
        return (
          <Link key={el.category} to="/Mail">
            <Item
              onClick={() => {
                dispatch(changeIndexCategory(index));
                dispatch(changeCurrentCategory(el.category));
              }}
              currentItem={categoryIndex === index}
            >
              {el.image}
              <Text>{el.category}</Text>
            </Item>
          </Link>
        );
      })}
    </Items>
  );
};
