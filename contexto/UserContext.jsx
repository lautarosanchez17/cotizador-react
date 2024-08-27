import React, { createContext, useEffect, useState } from 'react';

export const userContext = createContext()

const UserContext = ({ children }) => {
    const [historialUsuario, setHistorialUsuario] = useState([])

    const agregarItem = (item) => {
        const actualizar = [ ...historialUsuario, item ]
        localStorage.setItem('historial', JSON.stringify(actualizar))
        setHistorialUsuario(actualizar)
    }

    useEffect(() => {
        const historial = JSON.parse(localStorage.getItem('historial'))
        setHistorialUsuario(historial || [])
    }, [])

    return (
        <userContext.Provider value={{ historialUsuario, agregarItem }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;