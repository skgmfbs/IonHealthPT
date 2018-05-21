import { Health, HealthDataType } from '@ionic-native/health';
import { HealthCareDataProvider, HealthCareOptions } from './health-data-provider';

export class HealthProvider implements HealthCareDataProvider {

    constructor(private health: Health) {
    }

    public isAvailable(): Promise<boolean> {
        return this.health.isAvailable();
    }

    public requestAuthorization(dataTypes: string[]): Promise<any> {
        let healthDataType: HealthDataType = {};
        if (dataTypes.length == 1 && (dataTypes[0] === 'gender' || dataTypes[0] === 'date_of_birth')) {
            healthDataType.read = [dataTypes[0], 'height', 'weight'];
        } else {
            healthDataType.read = dataTypes;
        }
        return this.health.requestAuthorization([healthDataType]);
    }

    public query(queryOptions: HealthCareOptions): Promise<any> {
        return this.health.query({
            startDate: new Date(queryOptions.startDate),
            endDate: new Date(queryOptions.endDate),
            dataType: queryOptions.dataType
        })
    }

    public getSupportedDataType(): string[] {
        return [
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
    }
}