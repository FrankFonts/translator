import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Language, TranslatorStatus } from 'src/app/interfaces';
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
  sourceLanguageList: Language[] = [];
  targetLanguageList: Language[] = [];
  detectLanguage: Language[] = [
    {
      code: 'detect',
      name: 'Detect Language',
    },
  ];
  translationInProgress: boolean = false;
  translatedInput?: string;
  translationError?: string;

  translationData = new FormGroup({
    sourceLanguage: new FormControl('', Validators.required),
    targetLanguage: new FormControl('', Validators.required),
    sourceInput: new FormControl('', [Validators.required]),
  });

  constructor(
    private translationService: TranslationService,
    private translatorStatusService: TranslatorStatusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translationService.$languageList.subscribe((data) => {
      this.sourceLanguageList = data;
      this.sourceLanguageList = this.detectLanguage.concat(
        this.sourceLanguageList
      );
      this.targetLanguageList = data;
    });

    this.translationService.$translationInProgress.subscribe((state) => {
      this.translationInProgress = state;
    });

    this.translationService.$translatedInput.subscribe((state) => {
      this.translatedInput = state;
    });

    this.translatorStatusService.$translatorStatus.subscribe((status) => {
      this.translatorStatus = status;
    });

    this.translatorStatusService.$mayTranslate.subscribe((status) => {
      this.mayTranslate = status;
    });

    this.translationService.$translationError.subscribe((message) => {
      this.translationError = message;
    });
  }

  ngOnDestroy() {
    this.translationService.$languageList.unsubscribe();

    this.translationService.$translationInProgress.unsubscribe();

    this.translationService.$translatedInput.unsubscribe();

    this.translatorStatusService.$translatorStatus.unsubscribe();

    this.translatorStatusService.$mayTranslate.unsubscribe();

    this.translationService.$translationError.unsubscribe();
  }

  navigateToRegistration() {
    this.router.navigateByUrl(environment.registrationUrl);
  }

  onSubmit() {
    let sourceLanguage = this.translationData.value.sourceLanguage;
    let targetLanguage = this.translationData.value.targetLanguage;
    let sourceInput = this.translationData.value.sourceInput;

    if (sourceLanguage && targetLanguage && sourceInput) {
      this.translatedInput = '';

      this.translationService.tryToTranslate(
        sourceLanguage,
        targetLanguage,
        sourceInput
      );
    }
  }
}
