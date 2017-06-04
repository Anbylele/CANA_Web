import {Component, ElementRef, ViewChild} from '@angular/core';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'MainNews',
    templateUrl: '../../../template/news.component.html',
    styleUrls: ['../../../style/css/news.component.css']
})

export class NewsComponent{

    constructor(
        private appUtil:AppUtil
    ){}

    ngAfterViewInit(): void {
    }
}