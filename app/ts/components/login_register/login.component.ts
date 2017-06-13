import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';

import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'cana-login',
    inputs:['loginElem'],
    templateUrl: '../../../template/login.component.html',
    styleUrls: ['../../../style/css/login.component.css']
})

export class LoginComponent implements AfterViewInit{
    @ViewChild('login') login:ElementRef;

    private processing:boolean = false;

    constructor(
        private AppUtil: AppUtil
    ){}

    ngAfterViewInit(): void{

    }

    loginElem: any;
}