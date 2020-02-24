import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { BannerService } from './banner.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string;

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
    private storage: Storage,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    const bannerTmp = this.bannerService.getAllBanner();

    this.banners = Object.keys(bannerTmp).map(key => bannerTmp[key]);
    this.storage.get('email').then(result => {
      this.email = result;
    });
    // console.log('banners: ', this.banners);
    // this.storage.get('email').then((val) => {
    //   this.alertCompleteUpdate(val);
    // });
    this.storage.get('tokenId').then((val) => {
      // this.alertCompleteUpdate(val);
      console.log('this TokenId is' + val);
    });
  }


  openSetting() {
    this.presentLoadingWithOptions();
    this.router.navigateByUrl('app/tabs/home/setting');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      showBackdrop: true,
      spinner: 'lines-small',
      duration: 1000,
      message: 'Opening setting...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  async alertCompleteUpdate(msg: string) {
    const alert = await this.alertCtrl.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay'
          // handler: () => {

          // }
        }
      ]
    });
    await alert.present();
  }

}
