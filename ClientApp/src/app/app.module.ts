import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

/**
 * Al ser una aplicacion pequeña se utilizaran los archivos de env normales de angular
 * pero para una automatizacion de procesos de despliegue a los servidores se podria utilizar un servicio de configuracion
 * que lea un archivo json y dependiendo de la url en la que se encuentre conectarse a servidores de back diferentes,
 * ya sea para QA, DEV, Pre-PROD o PROD
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
