import React, { Component } from "react";
import "./bootstrap.min.css";
import Header from "./components/header";
import NuevaCita from "./components/NuevaCita";
import ListaCitas from "./components/ListaCitas";

class App extends Component {
  state = {
    citas: [],
  };

  // Cargando datos desde LocalStorage

  componentDidMount() {
    const citasLS = localStorage.getItem("citas");
    if (citasLS) {
      this.setState({
        citas: JSON.parse(citasLS),
      });
    }
  }

  // Actualizando LocalStorage al eliminar o agregar.

  componentDidUpdate() {
    localStorage.setItem("citas", JSON.stringify(this.state.citas));
  }

  crearNuevaCita = (datos) => {
    // Copiamos el State actual
    const citas = [...this.state.citas, datos];

    //agrego el nuevo state
    this.setState({
      citas: citas,
    });
  };

  // Eliminar Citas
  eliminarCita = (id) => {
    // Hacer una copia del State
    const citasActuales = [...this.state.citas];

    // Borrando Cita

    const citas = citasActuales.filter((cita) => cita.id !== id);

    // Actualizar State

    this.setState({
      citas,
    });
  };

  render() {
    return (
      <div className="container ">
        <Header titulo="Administrador Pacientes Veterinaria" />

        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="nt-5 col-md-10 mx-auto">
            <ListaCitas citas={this.state.citas} eliminarCita={this.eliminarCita} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
