import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-modal',
    templateUrl: 'modal.html'
})
export class ModalPage {

    public jsonData = '';

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController) {
        this.jsonData = this.params.get('jsonData');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}