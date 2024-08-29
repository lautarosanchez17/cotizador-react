import React, { useContext, useState } from 'react';
import { userContext } from '../../contexto/UserContext';

const Historial = () => {

    const {historialUsuario} = useContext(userContext)

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
                            <td data-label="Fecha de cotización">{item.fecha}</td>
                            <td data-label="Propiedad">{item.propiedad}</td>
                            <td data-label="Ubicación">{item.ubicacion}</td>
                            <td data-label="Metros cuadrados">{item.metros2}</td>
                            <td data-label="Póliza mensual">$ {item.total}</td>
                        </tr>)} 
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Historial;