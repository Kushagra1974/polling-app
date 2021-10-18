import { createContext, useState } from "react";

import React from 'react'

export const StatesContext = createContext();

export function StatesProvider({ children }) {

    const [login, setLogin] = useState(false)

    const data = [
        { title: "free meal", category: "public", yes: 0, no: 0 },
    ]

    let localstore = localStorage.getItem("keys");
    console.log(localstore)
    if (!localstore) {
        localStorage.setItem("keys", JSON.stringify(data))
    }
    localstore = JSON.parse(localstore);
    console.log(localstore);

    const [counters, setCounters] = useState(localstore);

    const timearr = counters.map(() => 10)
    console.log(timearr);
    const [timer, setTimer] = useState(timearr)

    const activearr = counters.map(() => true);

    const [active, setActive] = useState(activearr)

    const obj = {
        login,
        setLogin,
        counters,
        setCounters,
        timer,
        setTimer,
        active,
        setActive
    }
    return (
        <StatesContext.Provider value={obj}>
            {children}
        </StatesContext.Provider>
    )
}
