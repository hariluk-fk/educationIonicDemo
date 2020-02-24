import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userProfile } from '../../model/userProfile';
import { AlertController, IonInput, IonButton, LoadingController } from '@ionic/angular';
import { Configuration } from 'src/app/app.constants';
import { RegistrationService } from './registration.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  userProfileTmp: Observable<userProfile>;
  userProfile: userProfile;
  loading: any;

  userName: string;
  email: string;
  gender: string;
  phoneNo: string;
  idCard: string;

  userNameTxt: string;
  emailTxt: string;
  genderTxt: string;
  phoneNoTxt: string;
  idCardTxt: string;
  createBtnTxt: string;

  constructor(
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private configuration: Configuration,
    private regisService: RegistrationService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.userNameTxt = this.configuration.userNameTxt;
    this.emailTxt = this.configuration.emailTxt;
    this.genderTxt = this.configuration.genderTxt;
    this.phoneNoTxt = this.configuration.phoneNoTxt;
    this.idCardTxt = this.configuration.idCardTxt;
    this.idCardTxt = this.configuration.idCardTxt;
    this.createBtnTxt = this.configuration.createBtnTxt;

  }

  async onRegistration() {
    const account = {
      email: this.email,
      userName: this.userName,
      gender: this.gender,
      phoneNo: this.phoneNo,
      idCard: this.idCard,
      password: 'init@1234'
    };

    if (typeof( this.email ) === 'string' && this.email.length > 0) {
      if (typeof( this.userName ) === 'string' && this.userName.length > 0) {
        if (typeof( this.gender ) === 'string' && this.gender.length > 0) {
          if (typeof( this.phoneNo ) === 'string' && this.phoneNo.length > 0) {
            this.loading = this.createLoadingController('Loading...');
            (await this.loading).present();
            this.userProfileTmp = this.regisService.onCreateAccount(account);
            this.userProfileTmp.subscribe(async (data: any) => {
              if (data.email != null) {
                this.userProfile = data[0];
                this.storage.set('email', data.email);
                (await this.loading).dismiss();
                this.alertCompleteUpdate('Complete');
                this.router.navigateByUrl('/app/tabs');
              } else {
                (await this.loading).dismiss();
                this.alertCompleteUpdate(data.status);
              }
            });
          } else {
            this.alertCompleteUpdate('Please insert your phone no.');
          }
        } else {
          this.alertCompleteUpdate('Please insert your gender.');
        }
      } else {
        this.alertCompleteUpdate('Please select your user name.');
      }
    } else {
      this.alertCompleteUpdate('Please insert your email.');
    }
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

  async createLoadingController(msg: string) {
    const loading = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'lines-small',
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return loading;
  }

}
