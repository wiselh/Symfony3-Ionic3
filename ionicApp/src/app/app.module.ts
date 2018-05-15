import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { UsersProvider } from '../providers/users/users';
import { EditModalPage } from '../pages/edit-modal/edit-modal';
import { AddModalPage } from '../pages/add-modal/add-modal';
import { InfoModalPage } from '../pages/info-modal/info-modal';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    AddModalPage,
    InfoModalPage,
    EditModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    AddModalPage,
    InfoModalPage,
    EditModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UsersProvider,
    DatePipe
  ]
})
export class AppModule {}
