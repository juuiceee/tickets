import { FC, useState } from "react";
import { IFilters } from "../../models/IFilters";
import './style.css';

interface IProps {
    filterTickets: (filters: IFilters) => void
}

export const Filters: FC<IProps> = ({ filterTickets }) => {

    const [filters, setFilters] = useState<IFilters>({
        all: false,
        nonStop: false,
        oneStop: false,
        twoStops: false,
        threeStops: false,
    })

    const [currency, setCurrency] = useState<string | null>(null)

    const handleCheckboxChange = (checked: boolean, filterName: string) => {
        const copyFilters = { ...filters }

        if (checked) {
            copyFilters[filterName as keyof IFilters] = true;
        }
        else {
            copyFilters[filterName as keyof IFilters] = false;
        }

        setFilters(copyFilters)
        filterTickets(copyFilters)
    }

    const selectOnlyOne = (filterName: string) => {
        const copyFilters = { ...filters }

        Object.keys(filters).forEach((key) => {
            if (key !== filterName) {
                copyFilters[key as keyof IFilters] = false;
            }
        });

        setFilters(copyFilters)
        filterTickets(copyFilters)
    }

    return (
        <div className="filter_container">
            <div className="currency">
                <span>
                    Валюта
                </span>
                <div className="currency__btns">
                    <button
                        className={currency === "RUB" ? "btn__selected" : "btn"}
                        onClick={() => setCurrency("RUB")}>
                        RUB
                    </button>
                    <button
                        className={currency === "USD" ? "btn__selected" : "btn"}
                        onClick={() => setCurrency("USD")}>
                        USD
                    </button>
                    <button
                        className={currency === "EUR" ? "btn__selected" : "btn"}
                        onClick={() => setCurrency("EUR")}>
                        EUR
                    </button>
                </div>
            </div>

            <div className="filter__stops">
                <span className="stops__header">
                    Количество пересадок
                </span>
                <div className="variants">
                    <label className="lbl">
                        <div className="inp">
                            <input
                                type="checkbox"
                                checked={filters.all}
                                onChange={(e) => handleCheckboxChange(e.target.checked, 'all')}
                            />
                            Все
                        </div>
                        {
                            filters.all &&
                            <button className="only" onClick={() => selectOnlyOne('all')}>Только</button>
                        }
                    </label>
                    <label className="lbl">
                        <div className="inp">
                            <input
                                type="checkbox"
                                checked={filters.nonStop}
                                onChange={(e) => handleCheckboxChange(e.target.checked, 'nonStop')}
                            />
                            Без пересадок
                        </div>
                        {
                            filters.nonStop &&
                            <button className="only" onClick={() => selectOnlyOne('nonStop')}>Только</button>
                        }
                    </label>
                    <label className="lbl">
                        <div className="inp">

                            <input
                                type="checkbox"
                                checked={filters.oneStop}
                                onChange={(e) => handleCheckboxChange(e.target.checked, 'oneStop')}
                            />
                            1 пересадка
                        </div>
                        {
                            filters.oneStop &&
                            <button className="only" onClick={() => selectOnlyOne('oneStop')}>Только</button>
                        }
                    </label>
                    <label className="lbl">
                        <div className="inp">
                            <input
                                type="checkbox"
                                checked={filters.twoStops}
                                onChange={(e) => handleCheckboxChange(e.target.checked, 'twoStops')}
                            />
                            2 пересадки
                        </div>
                        {
                            filters.twoStops &&
                            <button className="only" onClick={() => selectOnlyOne('twoStops')}>Только</button>
                        }
                    </label>
                    <label className="lbl">
                        <div className="inp">
                            <input
                                type="checkbox"
                                checked={filters.threeStops}
                                onChange={(e) => handleCheckboxChange(e.target.checked, 'threeStops')}
                            />
                            3 пересадки
                        </div>
                        {
                            filters.threeStops &&
                            <button className="only" onClick={() => selectOnlyOne('threeStops')}>Только</button>
                        }
                    </label>
                </div>
            </div>
        </div>
    )
}