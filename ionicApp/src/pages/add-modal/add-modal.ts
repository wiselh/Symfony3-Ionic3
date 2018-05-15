import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { User } from '../../models/User';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-modal',
  templateUrl: 'add-modal.html',
  styles: [`
  ion-input{
    border-bottom: 1px solid #2e112d;
  }
  ion-input:hover{
    border-bottom: 1px solid #35f3f0;
  }
  `]
})
export class AddModalPage {

  user: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  };
  loading: any;
  
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController, public navParams: NavParams,
    private authProvider: AuthProvider, public viewCtrl: ViewController, public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
  }
  addUser(){
    if(this.passed()){
      this.showLoader();
      this.authProvider.register(this.user)
        .then((res) => {
          this.loading.dismiss();
          this.presentToast('User Added Successfully!');
          this.navCtrl.setRoot(HomePage);
        }).catch((err) => { this.presentToast('Server Side Error, Try Again!') }); 
    } else this.presentToast('Please Entre Infos!');
  }
  passed(): boolean{
    if (this.user.firstname != '' && this.user.lastname != '' && 
        this.user.username != '' && this.user.email != '' && 
        this.user.password != '')
    return true;
    else return false;
  }

  dismiss(){
    this.viewCtrl.dismiss();
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

}
