import Props from './Props';
import './TickerItem.css';

function TickerItem({name, dateFrom, dateTo} : Props) {
  return (
    <div className='ticker-item'>
      <h2>{name}</h2>
      <div>{dateFrom.toLocaleDateString('RU-RU')}</div>
      <div>{dateTo.toLocaleDateString('RU-RU')}</div>
    </div>
  );
}

export default TickerItem;
