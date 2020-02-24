import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from 'src/app/service/APIService';
import { userProfile } from 'src/app/model/userProfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  userProfile: userProfile;
  userProfileTmp: Observable<userProfile>;

  constructor(private http: HttpClient, private apiService: APIService) { }

  onCreateAccount(account: any): Observable<userProfile> {
    const url = 'user/insertNewUser';
    // this.apiService.add(url, account).subscribe((data: userProfile) => {
    //   this.userProfile = data;
    //   return this.userProfile;
    // });

    // return this.userProfile;
    this.userProfileTmp = this.apiService.add(url, account);
    return this.userProfileTmp;
  }

}
