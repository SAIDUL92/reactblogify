import { useState } from "react";

import { PortalContext } from "../context";

export default function PortalProvider({ children }) {
    const [auth, setAuth] = useState({})

    return (
        <PortalContext.Provider value={{ auth, setAuth }}>
            {children}
        </PortalContext.Provider>
    )
}