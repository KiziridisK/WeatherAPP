import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AnimationItem } from 'lottie-web';
import {LottieComponent } from 'ngx-lottie';
import { TranslationPipe } from './pipes/translation.pipe';
import { TranslateService } from './services/translate.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    LottieComponent,
    TranslationPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('lottieAnim')  lottie!: LottieComponent;

  title = 'weather-app';
  private animationItem?: AnimationItem;
  public isPlaying: boolean = true;

  public options = {
    path: '/assets/animations/cloudy-weather.json',
    loop: false,
    autoplay: true,
  };
  constructor(
    private ngZone: NgZone,
    private translateService: TranslateService
  ) {
    translateService.setLanguage('el');
    // translateService.use('el'); // or 'en'
  }
  ngOnInit(): void {
    const hasSeen = sessionStorage.getItem('hasSeenIntro');
    console.log("this.translateService.currentLang",this.translateService.currentLang);
    if (!hasSeen) {
      this.isPlaying = true;
      sessionStorage.setItem('hasSeenIntro', 'true');
    } else {
      this.isPlaying = false;
    }
  }

  public startAnimation() {
    this.animationItem?.play();
  }

  public pauseAnimation() {
    this.animationItem?.pause();
  }

  public stopAnimation() {
    this.animationItem?.stop();
    console.log('this.animationItem',this.animationItem);
    this.isPlaying = false;
    console.log('this.isPlaying in stop',this.isPlaying);
  }

  public handleAnimation(animation: AnimationItem) {
    this.animationItem = animation;

     animation.addEventListener('complete', () => {
      console.log('Animation finished!');
      // Add your logic here, like hiding overlay or navigating
        this.ngZone.run(() => {
        this.isPlaying = false;
      });
      this.stopAnimation();
    });
  }

  
  public switchLang(lang: string) {
    this.translateService.setLanguage(lang);
  }
}
