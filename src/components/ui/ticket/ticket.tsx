import moment from "moment";
import { FC, useCallback } from "react";
import { ITicket } from "../../../models/ITicket";
import { FlightWay } from "../flight-way/flightWay";
import './style.css';

interface IProps {
    ticket: ITicket;
}

export const Ticket: FC<IProps> = ({ ticket }) => {

    const formatDate = useCallback((date: string) => {
        const dateMoment = moment(`${date}`, 'D MMM YYYY');
        const formattedDate = dateMoment.format('D MMM YYYY, ddd');
        return formattedDate;
    }, [])

    const formatStops = useCallback((stops: number) => {
        if (stops % 100 >= 5 && stops % 100 <= 20) {
            return "пересадок";
        }

        const remainder = stops % 10;

        if (remainder >= 5 || remainder === 0) {
            return "пересадок";
        } else if (remainder === 1) {
            return "пересадка";
        } else {
            return "пересадки";
        }
    }, [])

    return (
        <div className="ticket">
            <div className="company__price">
                <div>
                    {ticket.carrier}
                </div>
                <div>
                    <button className="buy__ticket">
                        Купить за {ticket.price} ₽
                    </button>
                </div>
            </div>

            <div className="fly__info">
                <div className="from">
                    <div className="from__time">
                        <span>
                            {ticket.departure_time}
                        </span>
                    </div>
                    <div className="from__info">
                        <span className="from__info__city">
                            {ticket.origin}, {ticket.origin_name}
                        </span>
                        <span className="from__info__date">
                            {formatDate(ticket.departure_date)}
                        </span>
                    </div>
                </div>

                <div className="stops">
                    {
                        ticket.stops > 0
                            ? <span>{ticket.stops} {formatStops(ticket.stops)}</span>
                            : <span>Без пересадок</span>
                    }
                    <FlightWay />
                </div>

                <div className="to">
                    <div className="from__time">
                        <span>
                            {ticket.arrival_time}
                        </span>
                    </div>
                    <div className="from__info">
                        <span className="from__info__city">
                            {ticket.destination_name}, {ticket.destination}
                        </span>
                        <span className="from__info__date">
                            {formatDate(ticket.arrival_date)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}