import React, { useContext, useState } from 'react';
import { userContext } from '../../contexto/UserContext';
import Swal from 'sweetalert2'

const Inicio = () => {

    const datosPropiedad = [
        {tipo: 'Casa', factor: 1.09},
        {tipo: 'P.H.', factor: 1.05},
        {tipo: 'Depto. Edificio', factor: 1.02},
        {tipo: 'Barrio Privado', factor: 1.19},
        {tipo: 'Oficina', factor: 2.39},
        {tipo: 'Local Comercial', factor: 1.41},
        {tipo: 'Depósito Logística', factor: 1.92}]

    const datosUbicacion = [
        { categoria: "ubicacion", tipo: "Ciudad Autónoma de Bs. As.", factor: 1.13 },
        { categoria: "ubicacion", tipo: "Tandil, Buenos Aires", factor: 1.04 },
        { categoria: "ubicacion", tipo: "Costa Atlántica", factor: 1.29 },
        { categoria: "ubicacion", tipo: "Patagonia Argentina", factor: 1.01 },
        { categoria: "ubicacion", tipo: "Gran Buenos Aires", factor: 1.25 },
        { categoria: "ubicacion", tipo: "9 de Julio, Pcia de Bs. As.", factor: 1.005 },
        { categoria: "ubicacion", tipo: "Chivilcoy, Pcia de Bs. As.", factor: 1.012 }]
    
    const [valor, setValor] = useState('0.00')
    const [propiedad, setPropiedad] = useState('')
    const [ubicacion, setUbicacion] = useState('')
    const [metros2, setMetros2] = useState('')
    const {agregarItem} = useContext(userContext)
    const [activo, setActivo] = useState(false)
    const selectPropiedad = document.querySelector("#propiedad")
    const selectUbicacion = document.querySelector("#ubicacion")
    const inputMetros2 = document.querySelector("#metros2")
    const button = document.querySelector('#button-1')
    const button2 = document.querySelector('#button-2')
    const [propiedadResumen, setPropiedadResumen] = useState('')
    const [ubicacionResumen, setUbicacionResumen] = useState('')
      
    const manejadorClick = () => {
        if (datosCompletos()) {
            setTimeout(() => {
                setActivo(!activo)
            }, 1000)
        }else {
            realizarCotizacion()
        }
    }

    const manejarCerrar = () => {
        setActivo(!activo)
    }

    const manejadorPropiedad = (e) => {
        const nuevoValor = e.target.value
        setPropiedad(nuevoValor)
    }

    const manejadorUbicacion = (e) => {
        const nuevoValor = e.target.value 
        setUbicacion(nuevoValor)
    }

    const manejadorMetros2 = (e) => {
        const nuevoValor = e.target.value 
        setMetros2(nuevoValor)
    }

    const alerta = (titulo, mensaje, icono)=> {
        Swal.fire({
            icon: icono || '', 
            title: titulo || '',
            text: mensaje,
            showConfirmButton: false,
            timer: 1500,
            width: '240px'
          })
    }

    const datosCompletos = ()=> (selectPropiedad.value !== '' && selectUbicacion.value !== '' && inputMetros2.value >= 20) ? true : false

    const realizarCotizacion = () => datosCompletos() ? manejarForm() : alerta('', 'Debes completar todos los datos en pantalla..', 'warning')
    
    const manejarForm = (e) => {
        e.preventDefault()
        button.innerHTML = `<img src="/public/ico/gif/loading.gif" alt="cargando" />`
        const costoM2 = 351.86
        setTimeout(() => {
            const tituloPropiedad = datosPropiedad.find(item => item.factor === Number(propiedad))
            const tituloUbicacion = datosUbicacion.find(item => item.factor === Number(ubicacion))
            let resultado = (costoM2 * Number(propiedad) * Number(ubicacion) * Number(metros2))
            alerta('', 'Cotización realizada con éxito.', 'success')
            setPropiedadResumen(tituloPropiedad.tipo)
            setUbicacionResumen(tituloUbicacion.tipo)
            setValor(resultado.toFixed(2))
            button.innerHTML = 'Cotizar'
        }, 1000)}


    const guardar = () => {
        button2.innerHTML = `<img src="/public/ico/gif/loading.gif" alt="cargando" />`
        setTimeout(() => {
            setActivo(!activo)
            const fecha = new Date().toLocaleString()
            const tituloPropiedad = datosPropiedad.find(item => item.factor === Number(propiedad))
            const tituloUbicacion = datosUbicacion.find(item => item.factor === Number(ubicacion))
            const nuevoItem = {
                fecha: fecha,
                propiedad: tituloPropiedad.tipo,
                ubicacion: tituloUbicacion.tipo,
                metros2,
                total: valor
            }
            agregarItem(nuevoItem)
            alerta('', 'Resumen guardado con éxito.', 'success')
            button2.innerHTML = 'Guardar'
        }, 1000)
    }

    
    return (
        <section className='contenedor'>
            <h1>Seguros del hogar<img src="/public/ico/img/seguros-casa.png" alt="logo-casa" /></h1>
            <div className='contenedor-form'>
                <form className='form' onSubmit={manejarForm}>
                    <h3>Completa los datos solicitados para cotizar</h3>
                    <label htmlFor="propiedad">Tipo de propiedad</label>
                    <select name="propiedad" id="propiedad" onChange={manejadorPropiedad} required defaultValue=''>
                        <option value="" disabled>...</option>
                        {datosPropiedad.map(item => <option key={item.tipo} value={item.factor}>{item.tipo}</option>)}
                    </select>
                    <label htmlFor="ubicacion">Ubicación de la propiedad</label>
                    <select name="ubicacion" id="ubicacion" onChange={manejadorUbicacion} required defaultValue=''>
                        <option value="" disabled>...</option>
                        {datosUbicacion.map(item => <option key={item.tipo} value={item.factor}>{item.tipo}</option>)}
                    </select>
                    <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
                    <input type="number" id="metros2" min="20" max="500" required onChange={manejadorMetros2} />
                    <button onClick={manejadorClick} id='button-1' className='button'>Cotizar</button>
                </form>
                <div className={activo ? 'datos-valor' : 'display'}>
                    <h3>Tu resumen</h3>
                    <div className='resumen'>
                        <span>Propiedad: {propiedadResumen}</span>
                        <span>Ubicacion: {ubicacionResumen} </span>
                        <span>Metros cuadrados: {metros2} </span>
                        <p className='importe'>Precio estimado: $ {valor}</p>
                        <button onClick={guardar} id='button-2' className='button'>Guardar</button>
                        <button onClick={manejarCerrar} className='cerrar'><i className="ti ti-x"></i></button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inicio;