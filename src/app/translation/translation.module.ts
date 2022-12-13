import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationComponent } from './translation/translation.component';
import { TranslationRoutingModule } from './translation-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TranslationComponent],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class TranslationModule {}
