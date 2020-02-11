import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public server = 'https://young-brook-22449.herokuapp.com/';
    public apiUrl = '';
    public serverWithApiUrl = this.server + this.apiUrl;
}
