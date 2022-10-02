using API.Context;
using API.Models;
using API.Models.Data_Transfer_Objects;
using Microsoft.EntityFrameworkCore;

namespace API.Service
{
    public class UsersService : IUserService
    {
        private ContextDB _context;
  

        public UsersService(ContextDB context)
        {
            _context = context;
        }

        public async Task<List<UserDTO>> ObtenerListado()
        {
            var query = await _context.Users.Where(x => !x.bEliminado).ToListAsync();
            return query.Select(x =>
            {
                return new UserDTO
                {
                    ID = x.ID,
                    Curp = x.sCurp,
                    Direccion = x.sDireccion,
                    FechaRegistro = x.dtFechaRegistro,
                    Nombre = x.sNombre,
                    Telefono = x.sTelefono
                };
            }).ToList();
        }

        public async Task<bool> Guardar(User model)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    if (model.ID == 0)
                        await _context.Users.AddAsync(model);
                    else
                    {
                        User userDB = await _context.Users.Where(x => x.ID == model.ID).FirstOrDefaultAsync();
                        userDB.sNombre = model.sNombre;
                        userDB.sCurp = model.sCurp;
                        userDB.sDireccion = model.sDireccion;
                        userDB.sTelefono = model.sTelefono;
                    }

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            return true;
        }

        public async Task<bool> Eliminar(int ID)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    User userDB = await _context.Users.Where(x => x.ID == ID).FirstOrDefaultAsync();
                    userDB.bEliminado = true;

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            return true;
        }

        public async Task<UserDTO> ObtenerPorID(int ID)
        {

            User userDB = await _context.Users.Where(x => x.ID == ID).FirstOrDefaultAsync();
            return new UserDTO()
            {
                ID = userDB.ID,
                Curp = userDB.sCurp,
                Direccion = userDB.sDireccion,
                FechaRegistro = userDB.dtFechaRegistro,
                Nombre = userDB.sNombre,
                Telefono = userDB.sTelefono
            };
        }
    }
}

    