import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Health } from '@ionic-native/health';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public healthReportJsonFormatted: string;
  public queryResult: string;

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
          .then(res => {
            this.healthReportJsonFormatted += '<br/>requestAuthorization: ' + JSON.stringify(res);
            this.health.query({
              startDate: new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)), // three days ago
              endDate: new Date(), // now
              dataType: 'activity'
            }).then((result) => {
              this.queryResult = 'query: ' + JSON.stringify(result);
            });
          })
          .catch(e => this.healthReportJsonFormatted += '<br/>error: ' + JSON.stringify(e));
      })
      .catch(e => this.healthReportJsonFormatted += '<br/>error: ' + JSON.stringify(e));
  }
}


export interface HealthResult {
  startDate: Date;
  endDate: Date;
  sourceBundleId: string;
  value: string,
  unit: string
}