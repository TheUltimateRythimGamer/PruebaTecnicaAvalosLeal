using API.Models;
using API.Models.Data_Transfer_Objects;

namespace API.Service
{
    public interface IUserService
    {
        Task<List<UserDTO>> ObtenerListado();
        Task<bool> Guardar(User model);
        Task<bool> Eliminar(int ID);
        Task<UserDTO> ObtenerPorID(int ID);
    }
}
