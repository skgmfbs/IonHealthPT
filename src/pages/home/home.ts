import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Health } from '@ionic-native/health';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public errorMessage: string;
  public queryResult: string;
  public healthResults: HealthResult[] = [];
  public dataType = 'Please, select';
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

  constructor(public navCtrl: NavController, private health: Health) {

  }

  public getHealthReport(event: any): void {
    if (!!this.dataType && this.dataType != 'Please, select') {
      this.errorMessage = '';
      this.health.isAvailable()
        .then((available: boolean) => {
          this.health.requestAuthorization([this.dataType])
            .then(res => {
              this.health.query({
                startDate: new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000)), // three days ago
                endDate: new Date(), // now
                dataType: this.dataType
              }).then((result) => {
                this.queryResult = JSON.stringify(result);
                this.healthResults = JSON.parse(this.queryResult);
              })
              .catch(e => {
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