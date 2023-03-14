import { ReactComponent as OrderImage } from '../../assets/order.svg';
import { ReactComponent as RegestrationImage } from '../../assets/regestration.svg';
import { ReactComponent as TicketsImage } from '../../assets/tickets.svg';
import { ReactComponent as TravelImage } from '../../assets/travel.svg';
import { ReactComponent as FinesAndTaxes } from '../../assets/finesAndTaxes.svg';
import { ReactComponent as Finance } from '../../assets/finance.svg';

//* Тут не смог переписать функцию на объект, как было в замечании потому что штрафы и налоги не может быть ключом объекта

export const messageCategoryImage = (flag: string) => {
  if (flag === 'Регистрация' || flag === 'Регистрации') return <RegestrationImage />;
  if (flag === 'Билеты') return <TicketsImage />;
  if (flag === 'Путешевствия') return <TravelImage />;
  if (flag === 'Заказы') return <OrderImage />;
  if (flag === 'Финансы') return <Finance />;
  if (flag === 'Штрафы и налоги') return <FinesAndTaxes />;
  return null;
};
