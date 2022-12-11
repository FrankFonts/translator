import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { User } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  mayTranslate: boolean = true;

  userData = new FormGroup({
    name: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    gdprConsent: new FormControl(true, Validators.required),
  });

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  registerUser() {
    const user: User = {
      name: this.userData.value.name || '',
      emailAddress: this.userData.value.emailAddress || '',
      phoneNumber: this.userData.value.phoneNumber || '',
      gdprConsent: this.userData.value.gdprConsent || true,
    };

    this.registrationService.registerUser(user);
    this.router.navigateByUrl(`${environment.translationUrl}`);
  }
}
