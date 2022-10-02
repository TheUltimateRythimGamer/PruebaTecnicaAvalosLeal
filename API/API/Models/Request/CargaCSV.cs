namespace API.Models.Request
{
    public class CargaCSVRequest
    {
        public List<CargaCSV> Registros{ get; set; }
    }

    public class CargaCSV
    {
        public DateTime Fecha{ get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Curp { get; set; }
    }
}
