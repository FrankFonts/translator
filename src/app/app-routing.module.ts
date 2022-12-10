import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslationGuard } from './translation.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/translator',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'translator',
    canActivate: [TranslationGuard],
    loadChildren: () =>
      import('./translation/translator.module').then(
        (m) => m.TranslationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
