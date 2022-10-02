import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/Users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  formDetalle = this.fb.group({
    TxtFecha: ['', [Validators.required]],
    TxtNombre: ['', [Validators.required]],
    TxtDireccion: ['', [Validators.required]],
    TxtTelefono: ['', [Validators.required, Validators.pattern("^[0-9 ]*$")]],
    TxtCurp: ['', [Validators.required, Validators.pattern("^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$")]],
  });

  get TxtFecha() { return this.formDetalle.get('TxtFecha') }
  get TxtNombre() { return this.formDetalle.get('TxtNombre') }
  get TxtDireccion() { return this.formDetalle.get('TxtDireccion') }
  get TxtTelefono() { return this.formDetalle.get('TxtTelefono') }
  get TxtCurp() { return this.formDetalle.get('TxtCurp') }

  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.TxtFecha?.setValue(moment(new Date()).format('DD/MM/YYYY'))
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params["id"]);
    });
  }

  public Guardar(): void {
    if (this.formDetalle.valid) {
      this.spinner.show();
      let json = {
        Id: this.id,
        Fecha: new Date(),
        Nombre: this.TxtNombre?.value,
        Direccion: this.TxtDireccion?.value,
        Telefono: this.TxtTelefono?.value,
        Curp: this.TxtCurp?.value
      }

      this.userService.guardar(json).subscribe((data) => {
        setTimeout(() => {
          this.spinner.hide();
          Swal.fire({
            title: 'Guardado correcto!',
            text: 'Se ha guardado la informacion correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((data) => {
            this.router.navigateByUrl('home');
          });
        }, 1200);

      }, (error) => {
        console.log(error);
        this.spinner.hide();
      });

    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Algunos campos estan incompletos o tienen errores en ellos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  public Cancelar(): void {
    this.router.navigateByUrl('home');
  }
  
}
