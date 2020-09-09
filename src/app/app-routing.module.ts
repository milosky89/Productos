import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { LoginComponent } from './loginApp/login/login.component';
import { RegistroComponent } from './loginApp/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';




const routes: Routes = [
        {path: '',component: InicioComponent,
        children:[

          {path:'home',component: HomeComponent, canActivate:[LoginGuard]},
          {path:'producto/:id',component: ProductoComponent},

          {path:'productos',component: ConsultaComponent},
          {path:'',redirectTo:'/home',pathMatch: 'full'},
        ]
        },
        {path:'login',component: LoginComponent},
        {path:'registroUsuario',component: RegistroComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
