using System.ComponentModel.DataAnnotations;

namespace API.Models.Request
{
    public class UserRequest
    {
        [Required]
        public int ID { get; set; }
        
        [Required]
        public DateTime Fecha { get; set; }
        
        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Direccion { get; set; }

        [Required]
        public string Telefono { get; set; }

        [Required]
        public string Curp { get; set; }
    }
}
