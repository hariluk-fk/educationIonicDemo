import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BannerService } from './banner.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  bannerConfig = {
    centeredSlides: true,
    autoplay: true,
    clickable: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination'
    }
  };

  sliderConfig = {
    spaceBetween: 30,
    centeredSlidesBounds: true,
    slidesPerView: 3.5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  banners = [];

  constructor(
    private bannerService: BannerService,
    private router: Router,
    private loadingController: LoadingController,
  ) {
  }

  ngOnInit() {
    const bannerTmp = this.bannerService.getAllBanner();

    this.banners = Object.keys(bannerTmp).map(key => bannerTmp[key]);
    console.log('banners: ', this.banners);
  }


  openSetting() {
    this.presentLoadingWithOptions();
    this.router.navigate(['/tabs/home/setting']);
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      showBackdrop: true,
      spinner: 'lines-small',
      duration: 2000,
      message: 'Opening setting...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
