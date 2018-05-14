import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Health, HealthDataType } from '@ionic-native/health';

import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public queryResult: any;
  public healthResults: HealthResult[] = [];
  public startDate = '';
  public endDate = '';
  public dataType = 'Please, select';
  public errorMessage = '';
  public supportedDataTypes: string[] = [
    'Please, select',
    'steps',
    'distance',
    'appleExerciseTime',
    'calories',
    'calories.active',
    'calories.basal',
    'activity',
    'height',
    'weight',
    'heart_rate',
    'fat_percentage',
    'blood_glucose',
    'insulin',
    'blood_pressure',
    'gender',
    'date_of_birth',
    'nutrition',
    'nutrition.calories',
    'nutrition.fat.total',
    'nutrition.fat.saturated',
    'nutrition.fat.unsaturated',
    'nutrition.fat.polyunsaturated',
    'nutrition.fat.monounsaturated',
    'nutrition.fat.trans',
    'nutrition.cholesterol',
    'nutrition.sodium',
    'nutrition.potassium',
    'nutrition.carbs.total',
    'nutrition.dietary_fiber',
    'nutrition.sugar',
    'nutrition.protein',
    'nutrition.vitamin_a',
    'nutrition.vitamin_c',
    'nutrition.calcium',
    'nutrition.iron',
    'nutrition.water',
    'nutrition.caffeine',
  ];

  constructor(public modalCtrl: ModalController, private health: Health) {
    this.startDate = new Date(new Date().getTime() - 1000).toISOString();
    this.endDate = new Date().toISOString();
  }

  public getHealthReport(event: any): void {
    try {
      if (!!this.dataType && this.dataType != 'Please, select') {
        this.errorMessage = '';
        this.health.isAvailable()
          .then((available: boolean) => {
            let healthDataType: HealthDataType = {};
            if (this.dataType === 'gender' || this.dataType === 'date_of_birth') {
              healthDataType.read = [this.dataType, 'height', 'weight'];
            } else {
              healthDataType.read = [this.dataType];
            }
            this.health.requestAuthorization([healthDataType])
              .then(res => {
                this.health.query({
                  startDate: new Date(this.startDate),
                  endDate: new Date(this.endDate),
                  dataType: this.dataType
                }).then((result) => {
                  this.queryResult = result;
                  this.healthResults = JSON.parse(JSON.stringify(result));
                }).catch(e => {
                  this.queryResult = '';
                  this.healthResults = [];
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