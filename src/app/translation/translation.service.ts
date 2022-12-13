// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from '../interfaces';
import { TranslatorStatusService } from '../translator-status.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  $languageList = new BehaviorSubject<Language[]>([]);
  $translationInProgress = new BehaviorSubject<boolean>(false);
  $translatedInput = new BehaviorSubject<string>('');
  $translationError = new BehaviorSubject<string>('');

  constructor(
    private translatorStatus: TranslatorStatusService,
    private http: HttpClient
  ) {
    this.getLanguageList();
  }

  registerTranslation() {
    this.translatorStatus.registerTranslation();
  }

  getLanguageList() {
    this.http.get<Language[]>(`${environment.baseUrl}/languages`).subscribe({
      next: (response) => {
        this.$languageList.next(response);
      },
      error: (error) => {
        console.log(`Can't get list of available languages: ${error.message}`);

        this.$translationError.next(error.message);
      },
    });
  }

  tryToTranslate(
    sourceLanguage: string,
    targetLanguage: string,
    sourceInput: string
  ) {
    if (sourceLanguage === 'detect') {
      this.$translationInProgress.next(true);

      var data = new FormData();
      data.append('q', sourceInput);

      this.http
        .post<[{ confidence: number; language: string }]>(
          `${environment.baseUrl}/detect`,
          data
        )
        .subscribe({
          next: (response) => {
            const detectedLanguage = response[0].language;

            this.$translationInProgress.next(false);

            this.translate(detectedLanguage, targetLanguage, sourceInput);
          },
          error: (error) => {
            console.log(`Can't detect language: ${error.message}`);

            this.$translationError.next(error.message);
            this.$translationInProgress.next(false);
          },
        });
    } else {
      this.translate(sourceLanguage, targetLanguage, sourceInput);
    }
  }

  translate(
    sourceLanguage: string,
    targetLanguage: string,
    sourceInput: string
  ) {
    this.$translationInProgress.next(true);

    var data = new FormData();
    data.append('q', sourceInput);
    data.append('source', sourceLanguage);
    data.append('target', targetLanguage);
    data.append('format', 'text');

    console.log(sourceInput, sourceLanguage, targetLanguage);

    this.http
      .post<{ translatedText: string }>(
        `${environment.baseUrl}/translate`,
        data
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.registerTranslation();

          this.$translatedInput.next(response.translatedText);
          this.$translationInProgress.next(false);
        },
        error: (error) => {
          console.log(`Something went wrong: ${error.message}`);

          this.$translationError.next(error.message);
          this.$translationInProgress.next(false);
        },
      });
  }
}
