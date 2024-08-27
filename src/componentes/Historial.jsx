import React, { useContext, useState } from 'react';
import { userContext } from '../../contexto/UserContext';

const Historial = () => {

    const {historialUsuario} = useContext(userContext)

    const tablaHistorial = document.querySelector("tbody")

    return (
        <section className='historial'>
            <h1>Historial<img src="/public/ico/img/logo-historial.png" alt="logo historial" /></h1>
            <div className='tabla-contenedor'>
                <p className='display'>No hay resumenes guardados en el historial.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de cotización</th>
                            <th>Propiedad</th>
                            <th>Ubicación</th>
                            <th>Metros cuadrados</th>
                            <th>Póliza mensual</th>
                            </tr>
                    </thead>
                    <tbody>
                        {historialUsuario.map((item, i) => <tr key={i}> 
                            <td>{item.fecha}</td>
                            <td>{item.propiedad}</td>
                            <td>{item.ubicacion}</td>
                            <td>{item.metros2}</td>
                            <td>$ {item.total}</td>
                        </tr>)} 
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Historial;