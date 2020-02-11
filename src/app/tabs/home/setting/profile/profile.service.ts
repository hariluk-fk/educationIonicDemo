import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from './profile';
import { APIService } from '../../../../service/APIService';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  profile: Observable<Profile>;
  status: any;

  constructor(private http: HttpClient, private apiService: APIService) {
  }

  getProfile(email: string): Observable<Profile> {
    const param = [];
    const url = 'user/searchByEmail';
    param[0] = email;
    // this.profile = from(await this.dataService.getSingle(this.url, this.param).toPromise());
    this.profile = this.apiService.getSingle(url, param);
    return this.profile;
  }

  updateProfile(user: any): Observable<any> {
    const url = 'user/updateProfile';
    this.status = this.apiService.update(url, user).subscribe((data) => {
      this.status = data[0];
    });
    return this.status;
  }


}
