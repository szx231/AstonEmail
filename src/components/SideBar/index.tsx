import { Wrapp } from './styled';
import { WriteMessageBtn } from './WriteMessageBtn';
import { MessageCategories } from './MessageCategories';
import { NewFolder } from './NewFolder';

export const SideBar = () => {
  return (
    <Wrapp>
      <WriteMessageBtn />
      <MessageCategories />
      <NewFolder />
    </Wrapp>
  );
};
