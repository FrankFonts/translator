import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatorStatusService } from 'src/app/translator-status.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  mayTranslate: boolean = true;

  userData = new FormGroup({
    name: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    gdprConsent: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private translatorStatusService: TranslatorStatusService
  ) {}

  ngOnInit() {
    this.translatorStatusService.$mayTranslate.subscribe((status) => {
      this.mayTranslate = status;
    });

    if (this.mayTranslate) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnDestroy() {
    this.translatorStatusService.$translatorStatus.unsubscribe;
  }

  registerUser() {
    console.log(this.userData.value);
  }
}
