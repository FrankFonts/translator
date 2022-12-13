import { Component, OnInit } from '@angular/core';
import { TranslatorStatusService } from 'src/app/translator-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  name?: string;

  constructor(private translatorStatusService: TranslatorStatusService) {}

  ngOnInit(): void {
    this.translatorStatusService.$translatorStatus.subscribe((response) => {
      this.name = response.registeredUser?.name;
    });
  }
}
