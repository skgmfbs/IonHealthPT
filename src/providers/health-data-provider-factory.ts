import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Health } from '@ionic-native/health';
import { HealthKit } from '@ionic-native/health-kit';

import { HealthCareDataProvider } from './health-data-provider';
import { HealthProvider } from './health-provider';
import { HealthKitProvider } from './healthKit-provider';

@Injectable()
export class HealthCareDataProviderFactory {
    constructor(private platform: Platform, private health: Health, private healthKit: HealthKit) {

    }
    getInstance(): HealthCareDataProvider {
        if (this.platform.is('ios')) {
            return new HealthKitProvider(this.healthKit);
        } else {
            return new HealthProvider(this.health);
        }
    }
}