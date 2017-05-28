import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'Home',
    templateUrl: '../../../template/home.component.html',
    styleUrls: ['../../../style/css/home.component.css']
})

export class HomeComponent implements OnInit,AfterViewInit{

    constructor(
        private AppUtil:AppUtil,
        private http:Http,
        private elementRef:ElementRef
    ){}

    ngAfterViewInit(): void{

    }

    ngOnInit(): void{

    }


}