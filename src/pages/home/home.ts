import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { HealthCareDataProvider, HealthCareDataProviderFactory } from '../../providers';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private healthDataProvider: HealthCareDataProvider;

  public queryResult: any;
  //public healthResults: HealthResult[] = [];
  public startDate = '';
  public endDate = '';
  public dataType = 'Please, select';
  public errorMessage = '';
  public supportedDataTypes: string[] = [];

  constructor(public modalCtrl: ModalController,
    private healthFactory: HealthCareDataProviderFactory) {
    this.startDate = new Date().toISOString();
    this.endDate = new Date().toISOString();
    this.healthDataProvider = this.healthFactory.getInstance();
    this.supportedDataTypes = this.healthDataProvider.getSupportedDataType();
  }

  public getHealthReport(event: any): void {
    try {
      if (!!this.dataType && this.dataType != 'Please, select') {
        this.errorMessage = '';
        this.healthDataProvider.isAvailable()
          .then((available: boolean) => {
            this.healthDataProvider.requestAuthorization([this.dataType])
              .then(res => {
                this.healthDataProvider.query({
                  startDate: new Date(this.startDate),
                  endDate: new Date(this.endDate),
                  dataType: this.dataType
                }).then((result) => {
                  //this.queryResult = JSON.stringify(result);
                  this.queryResult = result;
                  //this.healthResults = JSON.parse(JSON.stringify(result));
                }).catch(e => {
                  this.queryResult = '';
                  //this.healthResults = [];
                  this.errorMessage = JSON.stringify(e);
                });
              })
              .catch(e => this.errorMessage = JSON.stringify(e));
          })
          .catch(e => this.errorMessage = JSON.stringify(e));
      }
    }
    catch (error) {
      this.errorMessage = JSON.stringify(error);
    }
  }

  public openModal(): void {
    let modal = this.modalCtrl.create(ModalPage, { jsonData: this.queryResult });
    modal.present();
  }
}

export interface HealthResult {
  startDate: Date;
  endDate: Date;
  sourceBundleId: string;
  value: string,
  unit: string,
  distance: any[],
  calories: any[],
}