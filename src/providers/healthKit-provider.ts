import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit';
import { HealthCareDataProvider, HealthCareOptions } from './health-data-provider';

export class HealthKitProvider implements HealthCareDataProvider {
    constructor(private health: HealthKit) {
    }

    public isAvailable(): Promise<boolean> {
        return this.health.available();
    }

    public requestAuthorization(dataTypes: string[]): Promise<any> {
        if (dataTypes == undefined || (!!dataTypes && dataTypes.length == 0)) {
            return Promise.reject('No data type to request');
        }
        if (dataTypes.length == 1 && (dataTypes[0] === 'BloodPressure' || dataTypes[0] === 'Food')) {
            return Promise.resolve(true);
        }
        let options: HealthKitOptions = {};
        let supportedDataTypes: string[] = [];
        dataTypes.forEach(dataType => {
            supportedDataTypes.push(this.dataTypes.get(dataType));
        });
        if (supportedDataTypes.length == 0) {
            return Promise.reject('No data type to request');
        }
        options.readTypes = supportedDataTypes;
        return this.health.requestAuthorization(options);
    }

    public query(queryOptions: HealthCareOptions): Promise<any> {
        if (queryOptions.dataType === 'DateOfBirth') {
            return this.health.readDateOfBirth();
        } else if (queryOptions.dataType === 'BiologicalSex') {
            return this.health.readGender();
        } else if (queryOptions.dataType === 'BloodType') {
            return this.health.readBloodType();
        } else if (queryOptions.dataType === 'FitzpatrickSkinType') {
            return this.health.readFitzpatrickSkinType();
        } else if (queryOptions.dataType === 'BodyMass') {
            return this.health.readWeight({ unit: this.getUnit(queryOptions.dataType) });
        } else if (queryOptions.dataType === 'Height') {
            return this.health.readHeight({ unit: this.getUnit(queryOptions.dataType) });
        } else if (queryOptions.dataType === 'BloodPressure' || queryOptions.dataType === 'Food') {
            let options: HealthKitOptions = {
                startDate: new Date(queryOptions.startDate),
                endDate: new Date(queryOptions.endDate),
                correlationType: queryOptions.dataType === 'Food' ? 'HKCorrelationTypeIdentifierFood' : 'HKCorrelationTypeIdentifierBloodPressure',
                unit: this.getUnit(queryOptions.dataType)
            };
            return this.health.queryCorrelationType(options);
        } else {
            let options: HealthKitOptions = {
                startDate: new Date(queryOptions.startDate),
                endDate: new Date(queryOptions.endDate),
                sampleType: this.dataTypes.get(queryOptions.dataType)
            }
            if (!!this.getUnit(queryOptions.dataType)) {
                options.unit = this.getUnit(queryOptions.dataType);
            }
            return this.health.querySampleType(options);
        }
    }

    public getSupportedDataType(): string[] {
        return Array.from(this.dataTypes.keys());
    }

    private dataTypes: Map<string, string> = new Map<string, string>([
        ['AppleStandHour', 'HKCategoryTypeIdentifierAppleStandHour'],
        ['CervicalMucusQuality', 'HKCategoryTypeIdentifierCervicalMucusQuality'],
        ['IntermenstrualBleeding', 'HKCategoryTypeIdentifierIntermenstrualBleeding'],
        ['MenstrualFlow', 'HKCategoryTypeIdentifierMenstrualFlow'],
        ['OvulationTestResult', 'HKCategoryTypeIdentifierOvulationTestResult'],
        ['SexualActivity', 'HKCategoryTypeIdentifierSexualActivity'],
        ['SleepAnalysis', 'HKCategoryTypeIdentifierSleepAnalysis'],
        ['BiologicalSex', 'HKCharacteristicTypeIdentifierBiologicalSex'],
        ['BloodType', 'HKCharacteristicTypeIdentifierBloodType'],
        ['DateOfBirth', 'HKCharacteristicTypeIdentifierDateOfBirth'],
        ['FitzpatrickSkinType', 'HKCharacteristicTypeIdentifierFitzpatrickSkinType'],
        ['BloodPressure', 'HKCorrelationTypeIdentifierBloodPressure'],
        ['Food', 'HKCorrelationTypeIdentifierFood'],
        ['ActiveEnergyBurned', 'HKQuantityTypeIdentifierActiveEnergyBurned'],
        ['AppleExerciseTime', 'HKQuantityTypeIdentifierAppleExerciseTime'],
        ['BasalBodyTemperature', 'HKQuantityTypeIdentifierBasalBodyTemperature'],
        ['BasalEnergyBurned', 'HKQuantityTypeIdentifierBasalEnergyBurned'],
        ['BloodAlcoholContent', 'HKQuantityTypeIdentifierBloodAlcoholContent'],
        ['BloodGlucose', 'HKQuantityTypeIdentifierBloodGlucose'],
        ['BloodPressureDiastolic', 'HKQuantityTypeIdentifierBloodPressureDiastolic'],
        ['BloodPressureSystolic', 'HKQuantityTypeIdentifierBloodPressureSystolic'],
        ['BodyFatPercentage', 'HKQuantityTypeIdentifierBodyFatPercentage'],
        ['BodyMass', 'HKQuantityTypeIdentifierBodyMass'],
        ['BodyMassIndex', 'HKQuantityTypeIdentifierBodyMassIndex'],
        ['BodyTemperature', 'HKQuantityTypeIdentifierBodyTemperature'],
        ['DietaryBiotin', 'HKQuantityTypeIdentifierDietaryBiotin'],
        ['DietaryCaffeine', 'HKQuantityTypeIdentifierDietaryCaffeine'],
        ['DietaryCalcium', 'HKQuantityTypeIdentifierDietaryCalcium'],
        ['DietaryCarbohydrates', 'HKQuantityTypeIdentifierDietaryCarbohydrates'],
        ['DietaryChloride', 'HKQuantityTypeIdentifierDietaryChloride'],
        ['DietaryCholesterol', 'HKQuantityTypeIdentifierDietaryCholesterol'],
        ['DietaryChromium', 'HKQuantityTypeIdentifierDietaryChromium'],
        ['DietaryCopper', 'HKQuantityTypeIdentifierDietaryCopper'],
        ['DietaryEnergyConsumed', 'HKQuantityTypeIdentifierDietaryEnergyConsumed'],
        ['DietaryFatMonounsaturated', 'HKQuantityTypeIdentifierDietaryFatMonounsaturated'],
        ['DietaryFatPolyunsaturated', 'HKQuantityTypeIdentifierDietaryFatPolyunsaturated'],
        ['DietaryFatSaturated', 'HKQuantityTypeIdentifierDietaryFatSaturated'],
        ['DietaryFatTotal', 'HKQuantityTypeIdentifierDietaryFatTotal'],
        ['DietaryFiber', 'HKQuantityTypeIdentifierDietaryFiber'],
        ['DietaryFolate', 'HKQuantityTypeIdentifierDietaryFolate'],
        ['DietaryIodine', 'HKQuantityTypeIdentifierDietaryIodine'],
        ['DietaryIron', 'HKQuantityTypeIdentifierDietaryIron'],
        ['DietaryMagnesium', 'HKQuantityTypeIdentifierDietaryMagnesium'],
        ['DietaryManganese', 'HKQuantityTypeIdentifierDietaryManganese'],
        ['DietaryMolybdenum', 'HKQuantityTypeIdentifierDietaryMolybdenum'],
        ['DietaryNiacin', 'HKQuantityTypeIdentifierDietaryNiacin'],
        ['DietaryPantothenicAcid', 'HKQuantityTypeIdentifierDietaryPantothenicAcid'],
        ['DietaryPhosphorus', 'HKQuantityTypeIdentifierDietaryPhosphorus'],
        ['DietaryPotassium', 'HKQuantityTypeIdentifierDietaryPotassium'],
        ['DietaryProtein', 'HKQuantityTypeIdentifierDietaryProtein'],
        ['DietaryRiboflavin', 'HKQuantityTypeIdentifierDietaryRiboflavin'],
        ['DietarySelenium', 'HKQuantityTypeIdentifierDietarySelenium'],
        ['DietarySodium', 'HKQuantityTypeIdentifierDietarySodium'],
        ['DietarySugar', 'HKQuantityTypeIdentifierDietarySugar'],
        ['DietaryThiamin', 'HKQuantityTypeIdentifierDietaryThiamin'],
        ['DietaryVitaminA', 'HKQuantityTypeIdentifierDietaryVitaminA'],
        ['DietaryVitaminB12', 'HKQuantityTypeIdentifierDietaryVitaminB12'],
        ['DietaryVitaminB6', 'HKQuantityTypeIdentifierDietaryVitaminB6'],
        ['DietaryVitaminC', 'HKQuantityTypeIdentifierDietaryVitaminC'],
        ['DietaryVitaminD', 'HKQuantityTypeIdentifierDietaryVitaminD'],
        ['DietaryVitaminE', 'HKQuantityTypeIdentifierDietaryVitaminE'],
        ['DietaryVitaminK', 'HKQuantityTypeIdentifierDietaryVitaminK'],
        ['DietaryWater', 'HKQuantityTypeIdentifierDietaryWater'],
        ['DietaryZinc', 'HKQuantityTypeIdentifierDietaryZinc'],
        ['DistanceCycling', 'HKQuantityTypeIdentifierDistanceCycling'],
        ['DistanceWalkingRunning', 'HKQuantityTypeIdentifierDistanceWalkingRunning'],
        ['ElectrodermalActivity', 'HKQuantityTypeIdentifierElectrodermalActivity'],
        ['FlightsClimbed', 'HKQuantityTypeIdentifierFlightsClimbed'],
        ['ForcedExpiratoryVolume1', 'HKQuantityTypeIdentifierForcedExpiratoryVolume1'],
        ['ForcedVitalCapacity', 'HKQuantityTypeIdentifierForcedVitalCapacity'],
        ['HeartRate', 'HKQuantityTypeIdentifierHeartRate'],
        ['Height', 'HKQuantityTypeIdentifierHeight'],
        ['InhalerUsage', 'HKQuantityTypeIdentifierInhalerUsage'],
        ['LeanBodyMass', 'HKQuantityTypeIdentifierLeanBodyMass'],
        ['NikeFuel', 'HKQuantityTypeIdentifierNikeFuel'],
        ['NumberOfTimesFallen', 'HKQuantityTypeIdentifierNumberOfTimesFallen'],
        ['OxygenSaturation', 'HKQuantityTypeIdentifierOxygenSaturation'],
        ['PeakExpiratoryFlowRate', 'HKQuantityTypeIdentifierPeakExpiratoryFlowRate'],
        ['PeripheralPerfusionIndex', 'HKQuantityTypeIdentifierPeripheralPerfusionIndex'],
        ['RespiratoryRate', 'HKQuantityTypeIdentifierRespiratoryRate'],
        ['StepCount', 'HKQuantityTypeIdentifierStepCount'],
        ['UVExposure', 'HKQuantityTypeIdentifierUVExposure'],
    ]);

    private getUnit(dataType: string): string {
        if (dataType === 'BodyMass') {
            return 'kg';
        } else if (dataType === 'Height') {
            return 'cm';
        } else if (dataType === 'Food') {
            return 'g';
        } else if (dataType.startsWith('BloodPressure')) {
            return 'Pa';
        } else if (dataType === 'DistanceCycling' || dataType === 'DistanceWalkingRunning') {
            return 'km';
        } else if (dataType.startsWith('HeartRate')) {
            return 'count/min';
        } else {
            return undefined;
        }
    }
}