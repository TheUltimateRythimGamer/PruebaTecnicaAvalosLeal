import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from 'src/app/services/Users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loadData();
  }

  public Add(id: number) {
    this.router.navigateByUrl('detail/' + id)
  }

  private loadData() {
    this.userService.loadData().subscribe((data) => {
      console.log(data.listado);
      this.data = data.listado.map((x: any) => {
        return {
          id: x.id,
          curp: x.curp,
          direccion: x.direccion,
          fechaRegistro: x.fechaRegistro,
          nombre: x.nombre,
          telefono: x.telefono
        }
      });
      setTimeout(() => {
        this.spinner.hide();
      }, 500);

    }, (error) => {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.spinner.hide();
    });

  }

  Delete(id: number) {
    Swal.fire({
      title: 'Segurx de eliminar?',
      text: 'Este cambio no se podria deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminalo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado',
          'Se ha eliminado con exito',
          'success'
        )
        this.userService.Eliminar(id).subscribe((data: any) => {
          this.loadData();
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        })
      }
    })
  }

}
