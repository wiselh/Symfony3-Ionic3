import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ToastController } from 'ionic-angular';
import { User } from '../../models/User';

@Injectable()
export class AuthProvider {
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  };
  public token: string;
  loginCheckUri: string = 'http://127.0.0.1:8000/api/login_check';
  registerUri: string = 'http://127.0.0.1:8000/app/register';
  apiUrl: string = 'http://127.0.0.1:8000'; 

  constructor(private http: Http, private toastCtrl: ToastController,) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username:string,password:string) {

    let headers = new Headers();
    headers.append('content-type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return new Promise((resolve, reject) => {
      this.http.post(this.loginCheckUri, body, { headers: headers })
      .subscribe(res => {
        resolve(res.json());
        const token = res.json() && res.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        } else {
          this.presentToast('Session has been Expired!');
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  register(user) {

    return new Promise((resolve, reject) => {
      const headers = new Headers();
      headers.append('content-type', 'application/json'); 
      this.http
        .post(this.registerUri, JSON.stringify(user), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, err =>{
          reject(err);
        }
      )
    });
  }

  logout() {
    localStorage.clear();
    this.token = null;
    
    // return new Promise((resolve, reject) => {
    //   let headers = new Headers();
    //   headers.append('X-Auth-Token', this.token);
    //   this.http.post(this.apiUrl + '/api/logout', {}, { headers: headers })
    //     .subscribe(res => {
    //       localStorage.clear();
    //       this.token = null;
    //     }, (err) => {
    //       reject(err);
    //     });
    // });
  }
 
  private handelError(error: Response) {
    return Observable.throw(error.json() || 'server error');
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}