import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatorStatus } from 'src/app/interfaces';
import { TranslatorStatusService } from 'src/app/translator-status.service';
import { environment } from 'src/environments/environment';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit, OnDestroy {
  translatorStatus: TranslatorStatus = {
    numberOfTranslations: 0,
    registeredUser: null,
  };
  mayTranslate: boolean = true;

  constructor(
    private translation: TranslationService,
    private translatorStatusService: TranslatorStatusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translatorStatusService.$translatorStatus.subscribe((status) => {
      this.translatorStatus = status;
    });
    this.translatorStatusService.$mayTranslate.subscribe((status) => {
      this.mayTranslate = status;
    });
  }

  ngOnDestroy() {
    this.translatorStatusService.$translatorStatus.unsubscribe;
    this.translatorStatusService.$mayTranslate.unsubscribe;
  }

  navigateToRegistration() {
    this.router.navigateByUrl(environment.registrationUrl);
  }

  translate() {
    this.translation.registrerTranslation();
  }
}
