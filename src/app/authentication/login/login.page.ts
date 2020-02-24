import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ToastController,
  AlertController,
  Platform,
  LoadingController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {
  FingerprintAIO,
  FingerprintOptions
} from '@ionic-native/fingerprint-aio/ngx';
import { APIService } from 'src/app/service/APIService';
import { Storage } from '@ionic/storage';
import { loadingController } from '@ionic/core';
import { RegistrationService } from '../registration/registration.service';
import { Observable } from 'rxjs';
import { userProfile } from 'src/app/model/userProfile';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  fingerprintOptions: FingerprintOptions;
  email: string;
  pwd: string;
  status: Status;
  tmp: any;
  loading: any;
  userData: any;
  userProfileTmp: Observable<userProfile>;
  account: any;

  constructor(
    public nav: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private plt: Platform,
    private faio: FingerprintAIO,
    private apiService: APIService,
    private loadingCtrl: LoadingController,
    private fb: Facebook,
    private storage: Storage,
    private regisService: RegistrationService
  ) {
    this.plt.ready().then(() => {});
  }

  ngOnInit() {
    this.onLoginScan();
    this.storage.get('email').then((email: string) => {
      this.email = email;
      // if (typeof( this.email ) === 'string' && this.email.length > 0) {
      this.onLoginScan();
      // }
    });
  }

  onRegistration() {
    this.router.navigateByUrl('/auth/registration');
  }

  async onLogin() {
    if (typeof this.email === 'string' && this.email.length > 0) {
      if (typeof this.pwd === 'string' && this.pwd.length > 0) {
        this.loading = this.createLoadingController('Loading...');
        (await this.loading).present();
        const url = 'user/searchByEmail/' + this.email + '/' + this.pwd;
        this.tmp = this.apiService
          .getSingle(url, null)
          .subscribe(async (data: Status) => {
            if (data.status === 'true') {
              this.storage.set('email', this.email);
              this.router.navigateByUrl('/app/tabs');
            } else {
              this.alertCompleteUpdate('incorrect');
            }
            (await this.loading).dismiss();
          });
      } else {
        // (await this.loading).dismiss();
        this.alertCompleteUpdate('Please insert your password.');
      }
    } else {
      // (await this.loading).dismiss();
      this.alertCompleteUpdate('Please insert your email.');
    }
  }

  onLoginScan() {
    if (typeof this.email === 'string' && this.email.length > 0) {
      this.fingerprintOptions = {
        description: 'please authen your app'
      };
      if (this.faio.isAvailable) {
        this.faio
          .show(this.fingerprintOptions)
          .then((result: any) => {
            this.router.navigateByUrl('/app/tabs');
          })
          .catch((error: any) => {
            this.alertCompleteUpdate(error.message);
            // this.pwdField.setFocus();
          });
      } else {
        this.alertCompleteUpdate('FingerPrint is not Available');
      }
    }
  }

  onFacebookLogin() {
    // this.fb.getLoginStatus().then(res => {
    //   if (res.status === 'connected') {
    //     this.router.navigateByUrl('/app/tabs');
    //   } else {
    this.fb
      .login(['public_profile', 'user_friends', 'email'])
      .then((response: FacebookLoginResponse) => {
        this.fb
          .api(
            'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',
            []
          )
          .then(async profile => {
            this.storage.set('email', profile['email']);
            this.storage.set('picUrl', profile['picture_large'].data.url);

            this.account = {
              email: profile['email'],
              userName: profile['name']
            };

            this.loading = this.createLoadingController('Loading...');
            (await this.loading).present();
            this.onValidateFB(this.account);
          });
      })
      .catch(e => {
        this.alertCompleteUpdate(JSON.stringify(e));
      });
    //   }
    // });
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  onValidateFB(account: any) {
    this.userProfileTmp = this.regisService.onCreateAccount(account);
    this.userProfileTmp.subscribe(async (data: any) => {
      if (data.email != null) {
        this.storage.set('email', data.email);
        (await this.loading).dismiss();
        this.router.navigateByUrl('/app/tabs');
      } else {
        (await this.loading).dismiss();
        this.router.navigateByUrl('/app/tabs');
      }
    });
  }

  async onLoginNoMember() {
    this.storage.set('email', '');
    this.router.navigateByUrl('/app/tabs');
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

export interface Status {
  status: string;
}
