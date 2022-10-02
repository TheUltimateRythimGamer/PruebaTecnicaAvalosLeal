namespace API.Models.Data_Transfer_Objects
{
    public class UserDTO
    {
        public int ID { get; set; }

        public string Nombre { get; set; }

        public string Direccion { get; set; }

        public string Telefono { get; set; }

        public string Curp { get; set; }

        public DateTime FechaRegistro { get; set; }
    }
}
