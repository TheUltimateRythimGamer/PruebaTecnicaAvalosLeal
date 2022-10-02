using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class User
    {
        [Required]
        public int ID { get; set; }
        
        [Required]
        public string sNombre { get; set; }

        [Required]
        public string sDireccion { get; set; }
        
        [Required]
        public string sTelefono { get; set; }

        [Required]
        public string sCurp { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime dtFechaRegistro { get; set; }

        [Column(TypeName = "bit")]
        public bool bEliminado { get; set; } = false;
    }
}
