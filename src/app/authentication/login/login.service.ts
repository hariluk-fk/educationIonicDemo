import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { APIService } from 'src/app/service/APIService';
import { Observable, from } from 'rxjs';
import { Configuration } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private actionUrl: string;
  status: Status;
  results: any;

  constructor(private http: HttpClient, private apiService: APIService, private configuration: Configuration) {
    this.actionUrl = configuration.server;
  }

  async onLogin(email: any, pwd: any) {
    const url = this.actionUrl + 'user/searchByEmail/' + email + '/' + pwd;
    await this.http.get(url).subscribe((data: Status) => {
      if (data.status === 'false') {
        return false;
      } else {
        return true;
      }
    });
  }
}

export interface Status {
  status: string;
}