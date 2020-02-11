import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../app.constants';

@Injectable({
    providedIn: 'root'
})
export class APIService {

    private actionUrl: string;

    constructor(private http: HttpClient, private configuration: Configuration) {
        this.actionUrl = configuration.server;
    }

    public getAll<T>(url: string): Observable<T> {
        return this.http.get<T>(this.actionUrl + '/' + url);
    }

    public getSingle<T>(url: string, params: string[]): Observable<T> {
        let actualUrl = this.actionUrl + url;
        if (params != null && params.length > 0) {
            for (const param of params) {
                actualUrl = actualUrl + '/' + param;
            }
        }
        return this.http.get<T>(actualUrl);
    }

    public add<T>(url: string, itemName: any): Observable<T> {
        const toAdd = { ItemName: itemName };
        return this.http.post<T>(this.actionUrl, toAdd);
    }

    public update<T>(url: string, itemUpdate: any): Observable<T> {
        const body = JSON.stringify(itemUpdate);
        console.log(body);
        return this.http.put<T>(this.actionUrl + url, body);
    }

    public delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(this.actionUrl + id);
    }
}


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({
            headers: req.headers.append('Accept', 'application/json')
        });
        return next.handle(req);
    }
}