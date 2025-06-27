import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private language = new BehaviorSubject<string>('el');
  private translations: any = {};

  constructor(
    private httpClient: HttpClient
  ) { }

  setLanguage(lang: string) {
    this.language.next(lang);
    this.httpClient.get(`/assets/i18n/${lang}.json`).subscribe(data => {
      this.translations = data;
    });
  }

  get currentLang(): string {
    console.log('this.language.value',this.language.value);
    return this.language.value;
  }

  translate(key: string): string {
    return key.split('.').reduce((obj, part) => obj?.[part], this.translations) || key;
  }
}
