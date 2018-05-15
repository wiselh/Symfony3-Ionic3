import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../models/User';
import { UsersProvider } from '../../providers/users/users';
import { EditModalPage } from '../edit-modal/edit-modal';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {

  users: User[];
  userId: string = this.navParams.get('userId');
  user: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    created_at: ''
  };
  loading: any;
  
  constructor(public navCtrl: NavController,public navParams: NavParams,
    private userProvider: UsersProvider,public viewCtrl: ViewController,
    private modalCtrl: ModalController, private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,) {
    this.userProvider.getUsers().subscribe(users => {
      this.users = users;
      for (var key in this.users) {
        var user = this.users[key];
        if (user.id == this.userId) {
          this.user = user;
        }
      }
    });      
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  deleteUser() {
    this.showLoader();
    this.userProvider.deleteUser(this.userId).subscribe(
      res =>{
        this.loading.dismiss();
        this.presentToast('User has been deleted Seccessfully!')
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.loading.dismiss();
        this.presentToast('Error, User has been not deleted!')
      }
    );
  }

  showUpdatePage(userId) {
    let modal = this.modalCtrl.create(EditModalPage, userId);
    modal.present();
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Deleting...'
    });
    this.loading.present();
  }
  
}
