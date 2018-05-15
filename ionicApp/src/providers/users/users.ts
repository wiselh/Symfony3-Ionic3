import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UsersProvider {

  uri: string = 'http://127.0.0.1:8000/api/users';
  constructor(public http: Http,private authProvider: AuthProvider) {
  }
  getUsers(): Observable<User[]> {
    const headers = new Headers({ 'Authorization': 'Bearer ' + this.authProvider.token });
    return this.http
      .get(this.uri, { headers: headers })
      .map(res => {
        return <User[]>res.json()
      })
      .catch(this.handelError);
  }
  // getSelectedPost(id): Observable<User> {
  //   const headers = new Headers({ 'Authorization': 'Bearer ' + this.authProvider.token });
  //   return this.http
  //     .get(this.uri + '/' + id, { headers: headers })
  //     .map(res => { return <User>res.json() })
  //     .catch(this.handelError);
  // }

  addUser(user: User) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authProvider.token);
    return this.http
      .post(this.uri + '/add', JSON.stringify(user) , { headers: headers })
      .map(res => res.json())
      .catch(this.handelError);
  }

  updateUser(user: User, id) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authProvider.token);
    return this.http
      .put(this.uri + '/' + id, JSON.stringify(user), { headers: headers })
      .map(res => { return res.json() })
      .catch(this.handelError);
  }

  deleteUser(id) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.authProvider.token);
    return this.http
      .delete(this.uri + '/' + id, { headers: headers })
      .map(res => { return res.json() })
      .catch(this.handelError);
  }
  private handelError(error: Response) {
    return Observable.throw(error.json() || 'server error');
  }
}
