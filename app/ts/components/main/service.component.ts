import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'MainService',
    templateUrl: '../../../template/service.component.html',
    styleUrls: ['../../../style/css/service.component.css']
})

export class ServiceComponent{
    @ViewChild("nav") nav: ElementRef;

    private oNav: any;
    private aButtons: any;
    private aUnderscores: any;

    constructor(
        private appUtil:AppUtil
    ){}

    ngAfterViewInit(): void {
        this.oNav = this.nav.nativeElement;
        this.aButtons = this.oNav.querySelectorAll("button");
        this.aUnderscores = this.oNav.querySelectorAll(".underscore");

        //initialize nav bar
        for(let i=0;i<this.aButtons.length;i++) {
            this.aUnderscores[i].style.width = "0";
            this.aUnderscores[i].style.left = (this.aButtons[i].offsetLeft + this.aButtons[i].offsetWidth / 2) + "px";
        }
    }

    onButtonClick(nav: any): void {
        this.underscoreMove(nav);
    }

    underscoreMove(nav: any): void {
        let aButtons, aUnderscores;
        aButtons = this.aButtons;
        aUnderscores = this.aUnderscores;
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