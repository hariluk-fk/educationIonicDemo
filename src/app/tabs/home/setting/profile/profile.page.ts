import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Profile } from './profile';
import { Observable, from } from 'rxjs';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  profile: Observable<Profile>;
  profileTmp: Promise<Profile>;
  user: Profile;
  url = '';
  param = [];
  status: any;
  loading: any;

  constructor(
    public nav: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private profileService: ProfileService) { }

  async ngOnInit() {
    this.loading = this.createLoadingController('Loading');
    (await this.loading).present();
    this.getProfile();
    (await this.loading).dismiss();
  }

  getProfile() {
    this.profile = this.profileService.getProfile('onepiece@gmail.com');
    this.profile.subscribe((data: Profile) => this.user = data[0]);
  }

  async updateProfile() {
    const msg = 'Updated profile complete';
    this.loading = this.createLoadingController('Loading');
    (await this.loading).present();
    this.profileService.updateProfile(this.user);
    (await this.loading).dismiss();
    this.alertCompleteUpdate(msg);
  }

  saveProfile() {
    const msg = 'Would you like to save ?';
    this.alertConfirmUpdate(msg);
  }

  async alertConfirmUpdate(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel:');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.updateProfile();
          }
        }
      ]
    });
    await alert.present();
  }

  async alertCompleteUpdate(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.nav.back();
          }
        }
      ]
    });
    await alert.present();
  }

  async createLoadingController(msg: string) {
    const loading = await this.loadingController.create({
      showBackdrop: true,
      spinner: 'lines-small',
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return loading;
  }

}
