import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './loginApp/login/login.component';
import { RegistroComponent } from './loginApp/registro/registro.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { PaisesService } from './services/pasis/paises.service';
import { BuscarComponent } from './components/buscar/buscar.component';
import { DataTablesModule } from 'angular-datatables';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ProductoComponent,
    ConsultaComponent,
    InicioComponent,
    BuscarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DataTablesModule,
    AngularFireModule.initializeApp(environment.configFirebase),
    AngularFireStorageModule
  ],
  providers: [PaisesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
