import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { InfoComponent } from './info/info.component';
import { LandingComponent } from './landing/landing.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { component: LandingComponent, path: 'landing' },
  { component: InfoComponent, path: 'info' },
  { component: FormComponent, path: 'form' },
  { component: SuccessComponent, path: 'success' },
  { redirectTo: 'landing', path: '**' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
