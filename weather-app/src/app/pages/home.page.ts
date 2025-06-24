import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import * as PAOK from '../../assets/animations/cloudy-weather.json'
import {LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    LottieComponent  
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})

export class HomePage implements OnInit{
  @ViewChild('lottieAnim')  lottie!: LottieComponent;
  public cityControl = new FormControl('')
  private animationItem?: AnimationItem;
  public isPlaying: boolean = true;
  public options = {
    path: '/assets/animations/cloudy-weather.json',
    loop: false,
    autoplay: true,
  };
  constructor(
    private router: Router,
    private ngZone: NgZone
  ) {

  }

  ngOnInit(): void {
    const hasSeen = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeen) {
      this.isPlaying = true;
      sessionStorage.setItem('hasSeenIntro', 'true');
    } else {
      this.isPlaying = false;
    }
  }
  public searchCity() {
    const city = this.cityControl.value?.trim();
    if(city) {
      this.router.navigate(['/weather', city]);
    }
  }

  startAnimation() {
    this.animationItem?.play()
  }

  pauseAnimation() {
    this.animationItem?.pause();
  }

  stopAnimation() {
    this.animationItem?.stop();
    console.log('this.animationItem',this.animationItem);
    this.isPlaying = false;
    console.log('this.isPlaying in stop',this.isPlaying);
  }

  handleAnimation(animation: AnimationItem) {
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
}
