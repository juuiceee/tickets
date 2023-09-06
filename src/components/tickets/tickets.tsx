import axios from "axios";
import { useEffect, useState } from "react";
import { IFilters } from "../../models/IFilters";
import { ITicket } from "../../models/ITicket";
import { Filters } from "../filters/filters";
import { Error } from "../ui/error";
import { Loader } from "../ui/loader";
import { Ticket } from "../ui/ticket/ticket";
import './style.css';

export const Tickets = () => {

    const [tickets, setTickets] = useState<ITicket[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)

    const [filteredTickets, setFiltredTickets] = useState<ITicket[]>([])

    const fetchData = () => {
        setIsLoading(true);
        axios.get("http://localhost:3000/tickets")
            .then((res) => {
                const sortedTickets = res.data.sort((a: ITicket, b: ITicket) => a.price - b.price)
                setTickets(sortedTickets)
                setFiltredTickets(sortedTickets)
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filterTickets = (filters: IFilters) => {
        let fTickets: ITicket[] = []

        if (
            !filters.all && !filters.nonStop && !filters.oneStop
            && !filters.twoStops && !filters.threeStops
        )
            fTickets = [...tickets]

        if (filters.all)
            fTickets = [...tickets]
        if (filters.nonStop)
            fTickets = [...fTickets, ...tickets.filter(t => t.stops === 0)]
        if (filters.oneStop)
            fTickets = [...fTickets, ...tickets.filter(t => t.stops === 1)]
        if (filters.twoStops)
            fTickets = [...fTickets, ...tickets.filter(t => t.stops === 2)]
        if (filters.threeStops)
            fTickets = [...fTickets, ...tickets.filter(t => t.stops === 3)]

        setFiltredTickets(fTickets)
    }

    if (error !== null)
        return <Error />

    if (isLoading)
        return <Loader />

    return (
        <div className="container">
            <Filters filterTickets={filterTickets} />
            <div className="list">
                {
                    filteredTickets.map((ticket, index) => (
                        <Ticket
                            key={index}
                            ticket={ticket}
                        />
                    ))
                }
            </div>
        </div>
    )
}