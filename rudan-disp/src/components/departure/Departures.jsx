import './departures.css';
//import data from './dummy';
import TrainIcon from './assets/train.svg';
import BusIcon from './assets/bus.svg';

export function Departures({ data }) {
    return (
        <div className='departures'>
            <ul>
                {data != null ? data.map((departure, index) => (
                    <li key={index}>
                        <div className='transport' style={{ backgroundColor: (departure.transport.transportSubType !== 'COMMUTER_RAIL' ? departure.transport.transportSubType : '#cc417f'), padding: '2rem', color: '#fff', borderRadius: '1rem' }}>
                            <div className={`${departure.transport.transportType.toLowerCase()} icon`} style={{padding: '1rem'}}>
                                {departure.transport.transportType.toLowerCase() === 'train' ? <img src={TrainIcon} alt='Train' /> : <img src={BusIcon} alt='Bus' />}
                                <div className='line' style={{textAlign: 'center'}}>{departure.transport.line}</div>
                            </div>
                            <div style={{width: '100%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#333', padding: '2rem', borderRadius: '1rem'}}>
                                <div className='details' style={{width: '45%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <div className='from'>{departure.stopAreaName}</div>
                                    <div className='to' style={{width: '50%'}}><strong>{departure.destination}</strong></div> 
                                </div>
                                <div style={{width: '10%',display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} >
                                    <div className='departuretime'>{departure.time.displayTime}</div>
                                    <div className='track'>{departure.track}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                )) : <li>No data</li>}
            </ul>
        </div>
    );
}
export default Departures;