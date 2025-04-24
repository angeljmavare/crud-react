import './App.css';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function App() {

  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [correo, setCorreo] = useState("");
  const [editar, setEditar] = useState(false);
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const agregarUsuario = () => {
    if (!nombre || !edad || !correo) {
      Swal.fire({
        icon: "warning",
        title: "¡Campos vacíos!",
        text: "Por favor, ingresa todos los datos antes de registrar.",
      });
      return;
    }

    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      edad,
      correo
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    limpiarDatos();

    Swal.fire({
      icon: "success",
      title: "¡Registro Exitoso!",
      html: `<strong>${nombre}</strong> ha sido registrado con éxito.`,
      timer: 1500
    });
  };

  const editarUsuario = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCorreo(val.correo);
  }

  const limpiarDatos = () => {
    setEditar(false);
    setId(0);
    setNombre("");
    setEdad(0);
    setCorreo("");
  };

  const actualizarUsuario = () => {
    setUsuarios(usuarios.map(usuario =>
      usuario.id === id ? { id, nombre, edad, correo } : usuario
    ));

    limpiarDatos();

    Swal.fire({
      icon: "success",
      title: "¡Actualización Exitosa!",
      html: `<strong>${nombre}</strong> ha sido actualizado con éxito.`,
      timer: 3000
    });
  };

  const borrarUsuario = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Filtrar para eliminar el usuario con el id correspondiente
        const usuarioEliminado = usuarios.find(usuario => usuario.id === id);
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));

        Swal.fire({
          title: "Usuario eliminado!",
          html: `<strong>${usuarioEliminado.nombre}</strong> ha sido eliminado.`,
          icon: "success",
          timer: 3000
        });
      } else {
        Swal.fire({
          title: "Cancelado!",
          text: "El usuario no ha sido eliminado.",
          icon: "info",
          timer: 3000
        });
      }
    });
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className='container1'>
        <div className="container">
          <div className='App'>
            <div className="datos mt-5">
              <div className="card text-center">
                <div className="card-header fw-bold">CRUD REACT USUARIOS</div>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Nombre: </span>
                    <input value={nombre} onChange={(event) => setNombre(event.target.value)} type="text" className="form-control" placeholder="Nombre" />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Edad: </span>
                    <input value={edad} onChange={(event) => setEdad(event.target.value)} type="number" className="form-control" placeholder="Edad" />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Correo: </span>
                    <input value={correo} onChange={(event) => setCorreo(event.target.value)} type="text" className="form-control" placeholder="Correo" />
                  </div>

                </div>
                <div className="card-footer text-muted">
                  <div>
                    {
                      editar ? <div>
                        <button onClick={actualizarUsuario} type="button" className="btn btn-info m-2">Actualizar</button>
                        <button onClick={limpiarDatos} type="button" className="btn btn-danger m-2">Cancelar</button>
                      </div>
                        :
                        <button onClick={agregarUsuario} type="button" className="btn btn-success">REGISTRAR</button>
                    }
                  </div>
                </div>
              </div>
            </div>


            <div className="input-group mb-3">
              <span className="input-group-text">Buscar:</span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar usuario..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Edad</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No hay usuarios encontrados.</td>
                  </tr>
                ) : (
                  usuariosFiltrados.map((val) => (
                    <tr key={val.id}>
                      <th scope="row">{val.id}</th>
                      <td>{val.nombre.length > 10 ? val.nombre.slice(0, 10) + "..." : val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.correo}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Acciones">
                          <button onClick={() => editarUsuario(val)} type="button" className="btn btn-info">Editar</button>
                          <button onClick={() => borrarUsuario(val.id)} type="button" className="btn btn-danger">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
