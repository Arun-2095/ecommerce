import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
  path:'',
  redirectTo:'/auth/login',
  pathMatch:'full'
},
{
  path:'user',
  redirectTo:'/user/dashboard',
  pathMatch:'full'
},
{
  path:'auth',
  loadChildren:() => import('./auth/auth.module').then( m => m.AuthModule)
},
{
  path:'user',
  loadChildren:()=> import('./user/user.module').then( m => m.UserModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
