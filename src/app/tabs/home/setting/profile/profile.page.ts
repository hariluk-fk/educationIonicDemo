import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { userProfile } from '../../../../model/userProfile';
import { Observable, from } from 'rxjs';
import { ProfileService } from './profile.service';
import { Configuration } from 'src/app/app.constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  profile: Observable<userProfile>;
  profileTmp: Promise<userProfile>;
  user: userProfile;
  url = '';
  param = [];
  status: any;
  loading: any;

  picUrl: any;
  tokenId: string;

  userNameTxt: string;
  emailTxt: string;
  genderTxt: string;
  phoneNoTxt: string;
  idCardTxt: string;
  saveBtnTxt: string;

  constructor(
    public nav: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private profileService: ProfileService,
    private configuration: Configuration,
    private storage: Storage) { }

  async ngOnInit() {
    this.userNameTxt = this.configuration.userNameTxt;
    this.emailTxt = this.configuration.emailTxt;
    this.genderTxt = this.configuration.genderTxt;
    this.phoneNoTxt = this.configuration.phoneNoTxt;
    this.idCardTxt = this.configuration.idCardTxt;
    this.idCardTxt = this.configuration.idCardTxt;
    this.saveBtnTxt = this.configuration.saveBtnTxt;

    this.loading = this.createLoadingController('Loading profile');
    (await this.loading).present();
    this.storage.get('picUrl').then(url => {
      // this.alertCompleteUpdate(url);
      this.picUrl = url;
    });
    this.storage.get('tokenId').then(tokenId => {
      // this.alertCompleteUpdate(url);
      this.user.tokenId = tokenId;
    });
    this.storage.get('tokenId').then((val) => {
      this.user.tokenId = val;
    });

    this.storage.get('email').then(result => {
      // this.email = result;
      this.getProfile(result);
    });
  }

  getProfile(emailTmp: string) {
    this.profile = this.profileService.getProfile(emailTmp);
    this.profile.subscribe(async (data: userProfile) => {
      this.user = data[0];
      (await this.loading).dismiss();
    });
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
