using API.Models;
using API.Models.Data_Transfer_Objects;
using API.Models.Request;
using API.Service;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private IUserService usersService;

        public UsersController(IUserService service)
        {
            usersService = service;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                List<UserDTO> users = await usersService.ObtenerListado();
                return Ok(new { mensaje = "OK", Listado = users });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
             }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetDetail([FromRoute] int id)
        {
            try
            {
                UserDTO user = await usersService.ObtenerPorID(id);
                return Ok(new { mensaje = "OK", User = user });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> Guardar([FromBody] UserRequest request)
        {
            try
            {
                User model = new User()
                {
                    ID = request.ID,
                    bEliminado = false,
                    dtFechaRegistro = request.Fecha,
                    sCurp = request.Curp,
                    sDireccion = request.Direccion,
                    sNombre = request.Nombre,
                    sTelefono = request.Telefono
                };

                bool user = await usersService.Guardar(model);

                if (user)
                    return Ok(new { mensaje = "OK" });
                else
                    return BadRequest(new { mensaje = "Error al guardar" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Eliminar([FromRoute] int id)
        {
            try
            {

                bool user = await usersService.Eliminar(id);

                if (user)
                    return Ok(new { mensaje = "OK" });
                else
                    return BadRequest(new { mensaje = "Error al guardar" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPost]
        [Route("CargaCSV")]
        public async Task<ActionResult> CargaCSV([FromBody] CargaCSVRequest request)
        {
            try
            {
                List<User> registros = new List<User>();
                request.Registros.ForEach(x =>
                {
                    User model = new User()
                    {
                        ID = 0,
                        bEliminado = false,
                        dtFechaRegistro = x.Fecha,
                        sCurp = x.Curp,
                        sDireccion = x.Direccion,
                        sNombre = x.Nombre,
                        sTelefono = x.Telefono
                    };
                    registros.Add(model);
                });

                bool exito = false;
                registros.ForEach( model =>
                {
                    exito = usersService.Guardar(model).Result;
                });

                if (exito)
                    return Ok(new { mensaje = "OK" });
                else
                    return BadRequest(new { mensaje = "Error al guardar por carga CSV" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }
    }
}
