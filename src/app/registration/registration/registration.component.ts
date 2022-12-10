import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatorStatus } from 'src/app/interfaces';
import { TranslatorStatusService } from 'src/app/translator-status.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  translatorStatus?: TranslatorStatus;

  constructor(
    private router: Router,
    private translatorStatusService: TranslatorStatusService
  ) {}

  ngOnInit() {
    this.translatorStatusService.$translatorStatus.subscribe((status) => {
      this.translatorStatus = status;
    });

    if (this.translatorStatus?.mayTranslate) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnDestroy() {
    this.translatorStatusService.$translatorStatus.unsubscribe;
  }
}
