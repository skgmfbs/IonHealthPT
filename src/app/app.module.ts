import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Health } from '@ionic-native/health';
import { HealthKit, } from '@ionic-native/health-kit';

import { HealthCareDataProviderFactory } from '../providers'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalPage } from '../pages/modal/modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Health,
    HealthKit,
    HealthCareDataProviderFactory,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
