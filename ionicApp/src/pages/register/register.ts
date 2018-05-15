import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import { User } from '../../models/User';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  styles: [`
  ion-input{
    border-bottom: 1px solid #2e112d;
  }
  ion-input:hover{
    border-bottom: 1px solid #35f3f0;
  }
  .error_message{
        color:#ff4046;
    }
    .error_imput{
      border-bottom:1px solid #ff4046;
    }
  `]
})
export class RegisterPage {

  user: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };
  loading: any;
  firstname_required = false;
  lastname_required = false;
  email_required = false;
  password_required = false;
  username_required = false;
  required_found: boolean;
  constructor(public navCtrl: NavController, private menu: MenuController, 
    private toastCtrl: ToastController, public navParams: NavParams,
    private authProvider: AuthProvider, public loadingCtrl: LoadingController,) {
  }

  register() {
    this.makeItFalse();
    for (var key in this.user) {
      var value = this.user[key];
      if (value == '') {
        switch (key) {
          case 'firstname': this.firstname_required = true; this.required_found = true
            break;
          case 'lastname': this.lastname_required = true; this.required_found = true
            break;
          case 'username': this.username_required = true; this.required_found = true
            break;
          case 'email': this.email_required = true; this.required_found = true
            break;
          case 'password': this.password_required = true; this.required_found = true
            break;
          default:
            break;
        }
      }
    }
    if (this.required_found) return false;
    this.showLoader();
    this.authProvider.register(this.user)
    .then((res) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }).catch((err) => { this.presentToast('Server Side Error, Try Again!') }); 
  }
  makeItFalse() {
    this.firstname_required = false;
    this.lastname_required = false;
    this.username_required = false;
    this.email_required = false;
    this.password_required = false;
    this.required_found = false;
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
}
