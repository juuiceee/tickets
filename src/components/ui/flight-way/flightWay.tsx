import airpane from '../../../content/icons/airplane.png';
import './style.css';

export const FlightWay = () => {
    return (
        <>
            <div className="flight-line"></div>
            <img src={airpane} alt="Самолет" className="airplane" />
        </>
    );
};