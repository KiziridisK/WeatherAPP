import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({ name: 'translate', pure: false })
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslateService) {}

  transform(value: string): string {
    return this.translationService.translate(value);
  }
}
