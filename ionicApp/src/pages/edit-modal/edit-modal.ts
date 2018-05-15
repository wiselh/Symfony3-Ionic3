import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { User } from '../../models/User';
import { HomePage } from '../home/home';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
  styles: [`
    .error_message{
        color:#ff4046;
    }
    .error_imput{
      border-bottom:1px solid #ff4046;
    }
    `]
})
export class EditModalPage {

  users: User[];
  user: User = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    created_at:''
  };
  userId: string = this.navParams.get('userId');
  firstname_required = false;
  lastname_required = false;
  email_required = false;
  password_required = false;
  username_required = false;
  required_found: boolean;
  loading:any;

  constructor(public navCtrl: NavController,public navParams: NavParams,private usersProvider: UsersProvider, 
    public loadingCtrl: LoadingController, public viewCtrl: ViewController,
    private toastCtrl: ToastController, public datepipe: DatePipe) {
    this.usersProvider.getUsers().subscribe(users => {
      this.users = users;
      for (var key in this.users) {
        var user = this.users[key];
        if (user.id == this.userId) {
          user.password='';
          user.created_at = this.datepipe.transform(user.created_at, 'dd-MM-y');
          this.user = user;
        }
      }
    });
  }
 
  onSubmit() {
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
    this.usersProvider.updateUser(this.user, this.userId).subscribe(
      res => {
        this.loading.dismiss();
        this.presentToast('User has been updated Seccessfully!');
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.loading.dismiss();
        this.presentToast('Error, User has been not updated!');
      }
    );
  }
  makeItFalse() {
    this.firstname_required = false;
    this.lastname_required = false;
    this.username_required = false;
    this.email_required = false;
    this.password_required = false;
    this.required_found = false;
  }
  dismiss() {
    this.viewCtrl.dismiss();
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
      content: 'Updating...'
    });
    this.loading.present();
  }

}
