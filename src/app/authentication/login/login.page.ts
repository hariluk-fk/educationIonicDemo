import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';
import { PinDialog } from '@ionic-native/pin-dialog/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public nav: NavController,
    private router: Router,
    private fb: Facebook,
    private pinDialog: PinDialog,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private storage: Storage,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      // this.storage.get('pin').then(pin => {
      //   if (!pin) {
      //     this.onSetPIN();
      //   }
      // });
      this.pinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel'])
        .then(
          (result: any) => {
            if (result.buttonIndex === 1) {
              console.log('User clicked OK, value is: ', result.input1);
            } else if (result.buttonIndex === 2) {
              console.log('User cancelled');
            }
          }
        );
    });
  }

  ngOnInit() {

  }

  // onOpenPINScreen() {
  //   this.storage.get('pin').then(pin => {
  //     this.nav.push(LockScreenComponent, {
  //       code: pin,
  //       ACDelButtons: false,
  //       passcodeLabel: 'PIN Code',
  //       onCorrect: () => {
  //         const toast = this.toastCtrl.create({
  //           message: 'App unlocked! ',
  //           duration: 3000
  //         });
  //       },
  //       onWrong: (attempts) => {
  //         const toast = this.toastCtrl.create({
  //           message: '${attempts} wrong possible attempt(s)',
  //           duration: 3000
  //         });
  //       }
  //     });
  //   });
  // }

  // onSetPIN() {
  //   const inputAlert = this.alertCtrl.create({
  //     // title: 'Secure your App.',
  //     message: 'Please set your PIN code for your App!',
  //     inputs: [
  //       {
  //         name: 'pin'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Set PIN',
  //         handler: data => {
  //           if (data.pin.length < 4) {
  //             return false;
  //           } else {
  //             this.storage.set('pin', data.pin);
  //             return true;
  //           }
  //         }
  //       }
  //     ]
  //   });
  // }

  async onLogin() {

    const toast = await this.toastCtrl.create({
      message: 'You are loging by Normal!',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['tabs']);
  }

  async onLoginScan() {
    const toast = await this.toastCtrl.create({
      message: 'You are loging by Scanner!',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['tabs']);
  }

  async onFacebookLogin() {
    const toast = await this.toastCtrl.create({
      message: 'You are loging by Facebook!',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['tabs']);
    // this.fb.login(['public_profile', 'user_friends', 'email'])
    //   .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    //   .catch(e => console.log('Error logging into Facebook', e));
    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  async onLoginNoMember() {
    const toast = await this.toastCtrl.create({
      message: 'You are loging by no member!',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['tabs']);
  }



}
