import {Component, ElementRef, ViewChild, HostListener} from '@angular/core';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'MainNews',
    templateUrl: '../../../template/news.component.html',
    styleUrls: ['../../../style/css/news.component.css']
})

export class NewsComponent{
    @ViewChild("nav") nav: ElementRef;
    @ViewChild("cnav") cnav: ElementRef;

    private oNav: any;
    private aButtons: any;
    private aUnderscores: any;

    private oCNav: any;
    private aCButtons: any;
    private aCUnderscores: any;

    constructor(
        private appUtil:AppUtil
    ){}

    ngAfterViewInit(): void {
        this.oNav = this.nav.nativeElement;
        this.aButtons = this.oNav.querySelectorAll("button");
        this.aUnderscores = this.oNav.querySelectorAll(".underscore");

        this.oCNav = this.cnav.nativeElement;
        this.aCButtons = this.oCNav.querySelectorAll("button");
        this.aCUnderscores = this.oCNav.querySelectorAll(".underscore");

        //initialize nav bar
        for(let i=0;i<this.aButtons.length;i++) {
            this.aUnderscores[i].style.width = "0";
            this.aUnderscores[i].style.left = (this.aButtons[i].offsetLeft + this.aButtons[i].offsetWidth / 2) + "px";
        }
        for(let i=0;i<this.aCButtons.length;i++) {
            this.aCUnderscores[i].style.width = "0";
            this.aCUnderscores[i].style.left = (this.aCButtons[i].offsetLeft + this.aCButtons[i].offsetWidth / 2) + "px";
        }
    }

    //handle the situation when window is re-sized
    @HostListener('window:resize', ['$event']) onResize(event): void{

    }

    onButtonClick(nav: any): void {
        this.underscoreMove(nav);
    }

    underscoreMove(nav: any): void {
        let aButtons, aUnderscores;
        if(nav.dataset.id.toUpperCase() === "NEWS") {
            aButtons = this.aButtons;
            aUnderscores = this.aUnderscores;
        }else if(nav.dataset.id.toUpperCase() === "CAREER") {
            aButtons = this.aCButtons;
            aUnderscores = this.aCUnderscores;
        }
        if(nav.className.toUpperCase() !== "ACTIVE") {
            let index = nav.dataset.index;
            for(let i=0;i<aButtons.length;i++) {
                aButtons[i].className = "";
                this.appUtil.myMove_yzy(aUnderscores[i],{
                    width: 0,
                    left: (aButtons[i].offsetLeft + aButtons[i].offsetWidth / 2)
                })
            }
            aButtons[index-1].className = "active";
            this.appUtil.myMove_yzy(aUnderscores[index-1],{
                width: aButtons[index-1].offsetWidth,
                left: aButtons[index-1].offsetLeft
            });
        }
    }
}