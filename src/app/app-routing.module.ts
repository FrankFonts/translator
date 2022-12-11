import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegistrationGuard } from './registration.guard';
import { TranslationGuard } from './translation.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: environment.translationUrl,
    pathMatch: 'full',
  },
  {
    path: environment.registrationUrl,
    canActivate: [RegistrationGuard],
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: environment.translationUrl,
    canActivate: [TranslationGuard],
    loadChildren: () =>
      import('./translation/translation.module').then(
        (m) => m.TranslationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
