import { Component } from '@angular/core';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'MainService',
    templateUrl: '../../../template/service.component.html',
    styleUrls: ['../../../style/css/service.component.css']
})

export class ServiceComponent{
    constructor(
        private appUtil:AppUtil
    ){}


}