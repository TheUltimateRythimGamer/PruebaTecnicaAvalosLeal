import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

/** 
 * Al ser unicamente una aplicacion de dos pantallas con una funcionalidad pequeña
 * no se utilizaran tenicas de mejora de rendimiento como lo puede ser lazy loading o quicklinkstrategy
 * pero si se planeara hacer crecer esta aplicacion se recomendaria aplicar dichas tenicas para la optimizacion
 * del codigo para el usuario final
*/
const routes: Routes = [
    { path: 'home', component: HomeComponent, },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'detail/:id', component: DetailsComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
