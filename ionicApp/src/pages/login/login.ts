import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,MenuController } from 'ionic-angular';
import { User } from '../../models/User';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles:[`
  ion-input{
    border-bottom: 1px solid #2e112d;
  }
  ion-input:hover{
    border-bottom: 1px solid #35f3f0;
  }
  `]
})
export class LoginPage {

  user: User = {
    email: 'admin',
    password: '0000'
  };
  loading: any;
  data: any;
  constructor(public navCtrl: NavController,private authProvider: AuthProvider, 
    private toastCtrl: ToastController, public loadingCtrl: LoadingController,
    private menu: MenuController, public navParams: NavParams) {
  }

  signIn() {
    if (this.user.email != "" || this.user.password != "" ) {
      this.showLoader();
      this.authProvider.login(this.user.email,this.user.password)
      .then((res)=>{
        this.loading.dismiss();
        this.navCtrl.setRoot(HomePage);})
      .catch((err) => { 
        this.loading.dismiss(); 
        console.log(err.json().message);
        this.presentToast('Login or Password are Incorrect!')
      });
    } else this.presentToast('Please enter your login Infos');
     
  }

  signUp() {
    this.navCtrl.push(RegisterPage);
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
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
