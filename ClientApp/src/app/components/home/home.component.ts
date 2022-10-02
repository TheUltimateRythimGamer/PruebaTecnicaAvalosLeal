import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CSVRecord } from 'src/app/models/CSVRecord.model';
import { UsersService } from 'src/app/services/Users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  search: string = "";
  @ViewChild('csvReader') csvReader: any;

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loadData();
  }

  private loadData() {
    this.userService.loadData().subscribe((data) => {
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

  public Add(id: number) {
    this.router.navigateByUrl('detail/' + id)
  }

  public Delete(id: number) {
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

  public UploadCSV($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        let registros = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        let registrosJson = registros.filter((element) => {
          return Object.prototype.toString.call(element.Fecha) === '[object Date]' && !isNaN(element.Fecha.getDate())
        });

        let json = {
          Registros: registrosJson
        }

        this.userService.CargaCSV(json).subscribe((data: any) => {
          this.spinner.show();
          Swal.fire(
            'Guardado',
            'Se han guardado con exito',
            'success'
          );
          this.loadData();
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        })
      };
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Añade un archivo CSV por favor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.fileReset();
    }
  }

  private isValidCSVFile(file: any): boolean {
    return file.name.endsWith(".csv");
  }

  private fileReset(): void {
    this.csvReader.nativeElement.value = "";
  }

  private getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: number): CSVRecord[] {
    let csvArr: CSVRecord[] = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = {
          Fecha: new Date(curruntRecord[0].toString().trim()),
          Nombre: curruntRecord[1].trim(),
          Direccion: curruntRecord[2].trim(),
          Telefono: curruntRecord[3].trim(),
          Curp: curruntRecord[4].trim()
        };
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

}
