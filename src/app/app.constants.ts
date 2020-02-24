import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'https://young-brook-22449.herokuapp.com/';
    public apiUrl = '';
    public serverWithApiUrl = this.server + this.apiUrl;

    // Loading and Alert
    public loadingTxt = 'Loading...';

    // Global button
    public saveBtnTxt = 'SAVE';

    // Registration text source
    public userNameTxt = 'UserName';
    public emailTxt = 'Email';
    public genderTxt = 'Gender';
    public phoneNoTxt = 'Phone No.';
    public idCardTxt = 'ID Card';
    public createBtnTxt = 'Create Account';

    // Product page
    public productConfirmMsg = 'Would you like to save this product ?';
    public productCreateBtnTxt = 'Create Product';
}
