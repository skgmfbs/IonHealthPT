import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Health, HealthDataType } from '@ionic-native/health';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public healthReportJsonFormatted: string;

  constructor(public navCtrl: NavController, private health: Health) {

  }

  public getHealthReport(): void {
    /*this.health.isAvailable()
    .then((available) => {
      this.healthReportJsonFormatted = 'Available: ' + available;
      let healthDataType:HealthDataType = {};
      healthDataType.read = ['height', 'weight'];
      healthDataType.write = ['height', 'weight'];
      this.health.isAuthorized(['height', 'weight'])
      .then((authorized) => {
        this.healthReportJsonFormatted += '<br/>Authorized: ' + authorized;
        
      }).catch((errorMessage) => alert(JSON.stringify(errorMessage)));
    }).catch((errorMessage) => alert(JSON.stringify(errorMessage)));*/
    this.health.isAvailable()
      .then((available: boolean) => {
        this.healthReportJsonFormatted = 'Available: ' + available;
        this.health.requestAuthorization([
          'distance', 'nutrition',  //read and write permissions
          {
            read: ['steps'],       //read only permission
            write: ['height', 'weight']  //write only permission
          }
        ])
          .then(res => this.healthReportJsonFormatted += '<br/>result: ' + JSON.stringify(res))
          .catch(e => this.healthReportJsonFormatted += '<br/>error: ' + JSON.stringify(e));
      })
      .catch(e => this.healthReportJsonFormatted += '<br/>error: ' + JSON.stringify(e));
  }

}
