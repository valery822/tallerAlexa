import { useUserContext } from "./useContenxt";
function UserDetail() 
{
 
  const { selectedUser } = useUserContext();

  if (!selectedUser) {
    return <p>No hay usuario seleccionado</p>;
  }

  return (
    <div>
      <h1>Detalles del Usuario </h1>
      <p><strong>ID:</strong> {selectedUser.id}</p>
      <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
      <p><strong>Correo:</strong> {selectedUser.correo}</p>
    </div>
    
  );
}

export default UserDetail;