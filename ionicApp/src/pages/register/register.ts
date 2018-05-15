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
  constructor(public navCtrl: NavController, private menu: MenuController, 
    private toastCtrl: ToastController, public navParams: NavParams,
    private authProvider: AuthProvider, public loadingCtrl: LoadingController,) {
  }

  register() {
    this.showLoader();
    this.authProvider.register(this.user)
    .then((res) => {
      this.loading.dismiss();
      this.navCtrl.setRoot(LoginPage);
    }).catch((err) => { this.presentToast('Server Side Error, Try Again!') }); 
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
