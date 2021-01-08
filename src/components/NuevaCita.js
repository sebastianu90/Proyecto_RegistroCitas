import React, { Component } from "react";
import { v1 as uuid } from "uuid";
import PropTypes from "prop-types";

const stateInicial = {
  cita: {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  },
  error: false,
};

class NuevaCita extends Component {
  state = {
    ...stateInicial,
  };

  // Captando info de los Inputs y seteandolos en el state.
  handleChange = (e) => {
    this.setState({
      cita: {
        ...this.state.cita,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Envío de Formulario
  handleSubmit = (e) => {
    e.preventDefault();

    // Extraer Valores de State
    const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

    // Validacion de contenido en Inputs

    if (mascota === "" || propietario === "" || fecha === "" || hora === "" || sintomas === "") {
      this.setState({
        error: true,
      });
      // Con este return, detengo la ejecucion del Submit en caso de que no se cumpla la condicion.
      return;
    }

    //Generar Objeto Cita
    const nuevaCita = { ...this.state.cita };
    nuevaCita.id = uuid();

    // Agregar la cita al state de App
    this.props.crearNuevaCita(nuevaCita);

    //Colocar en el State el stateInicial
    this.setState({
      ...stateInicial,
    });
  };

  render() {
    //Extraemos error del State
    const { error } = this.state;

    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-tittle text-center mb-5">
            Llena el Formulario para crear una nueva cita
          </h2>

          {error ? (
            <div className="alert alert-danger mt-2 mb-5 text-center">
              Todos los campos son obligatorios
            </div>
          ) : null}

          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Nombre Dueño</label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Dueño Mascota"
                  name="propietario"
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>
              <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="time"
                  className="form-control"
                  name="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
              <div className="col-sm-8 col-lg-10">
                <textarea
                  className="form-control"
                  name="sintomas"
                  placeholder="Describa los sintomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                ></textarea>
              </div>
            </div>
            <input
              type="submit"
              className="py-2 mt-3 btn btn-success btn-block"
              value="Agregar Nueva Cita"
            />
          </form>
        </div>
      </div>
    );
  }
}

NuevaCita.propTypes = {
  crearNuevaCita: PropTypes.func.isRequired,
};
export default NuevaCita;
