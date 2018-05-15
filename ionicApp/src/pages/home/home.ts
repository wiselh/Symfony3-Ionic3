import { Component } from '@angular/core';
import { NavController, ModalController, MenuController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AddModalPage } from '../add-modal/add-modal';
import { InfoModalPage } from '../info-modal/info-modal';
import { EditModalPage } from '../edit-modal/edit-modal';
import { User } from '../../models/User';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles:[`
  .hovred:hover {
    background: #eee;
    cursor: pointer;
  }
  .logout{
    float:right;
    margin-right:5px;
    cursor:pointer;
  }
  `]
})
export class HomePage {
  
  users: User[];
  user: User;
  constructor(public navCtrl: NavController,private modalCtrl: ModalController,
    private userProvider: UsersProvider, private menu: MenuController,private authProvider:AuthProvider) {
    this.users = [];
    this.userProvider.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  ionViewDidLoad() {
    this.menu.swipeEnable(true);
  }
  showAddModal() {
    let modal = this.modalCtrl.create(AddModalPage);
    modal.present();
  }
  showInfos(userId) {
    let modal = this.modalCtrl.create(InfoModalPage, userId);
    modal.present();
  }

  deleteUser(event, user: User) {
    this.userProvider.deleteUser(user);
  }
  logout(){
    this.authProvider.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
