import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatorStatus } from 'src/app/interfaces';
import { TranslatorStatusService } from 'src/app/translator-status.service';
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
    mayTranslate: true,
  };

  constructor(
    private translation: TranslationService,
    private translatorStatusService: TranslatorStatusService
  ) {}

  ngOnInit() {
    this.translatorStatusService.$translatorStatus.subscribe((status) => {
      this.translatorStatus = status;
    });
  }

  ngOnDestroy() {
    this.translatorStatusService.$translatorStatus.unsubscribe;
  }

  translate() {
    this.translation.registrerTranslation();
  }
}
