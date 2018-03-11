import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddIdeaComponent } from './components/add-idea/add-idea.component';
import { ViewIdeaComponent } from './components/view-idea/view-idea.component';
import { EditIdeaComponent } from './components/edit-idea/edit-idea.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'idea/add', component: AddIdeaComponent, canActivate: [AuthGuard]},
  {path: 'idea/view/:id', component: ViewIdeaComponent, canActivate: [AuthGuard]},
  {path: 'idea/edit/:id', component: EditIdeaComponent, canActivate: [AuthGuard]}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
