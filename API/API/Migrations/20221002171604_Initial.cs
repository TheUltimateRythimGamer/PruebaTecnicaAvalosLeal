using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    sNombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sDireccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sTelefono = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sCurp = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    dtFechaRegistro = table.Column<DateTime>(type: "smalldatetime", nullable: false),
                    bEliminado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
