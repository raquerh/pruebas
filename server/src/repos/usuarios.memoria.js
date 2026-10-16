// Repositorio en memoria: sirve para desarrollar sin MongoDB y para las pruebas.
// Los datos se pierden al reiniciar el servidor.
let contador = 0;

export function crearRepoUsuariosMemoria() {
  const lista = [];

  const sinHash = ({ passwordHash, ...resto }) => resto;

  return {
    async buscarPorMail(mail) {
      return lista.find((u) => u.mail === mail.toLowerCase()) || null;
    },
    async buscarPorId(id) {
      const u = lista.find((x) => x.id === id);
      return u ? sinHash(u) : null;
    },
    async listar() {
      return lista.map(sinHash);
    },
    async crear({ nombre, mail, rol, passwordHash }) {
      const u = { id: String(++contador), nombre, mail: mail.toLowerCase(), rol, passwordHash };
      lista.push(u);
      return sinHash(u);
    },
    async eliminar(id) {
      const i = lista.findIndex((u) => u.id === id);
      if (i === -1) return false;
      lista.splice(i, 1);
      return true;
    },
    async contarPorRol(rol) {
      return lista.filter((u) => u.rol === rol).length;
    },
  };
}
