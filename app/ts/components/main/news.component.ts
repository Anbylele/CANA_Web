import {Component, ElementRef, ViewChild} from '@angular/core';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'MainNews',
    templateUrl: '../../../template/news.component.html',
    styleUrls: ['../../../style/css/news.component.css']
})

export class NewsComponent{
    @ViewChild("nav") nav:ElementRef;

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
        if(nav.className.toUpperCase() !== "ACTIVE") {
            let index = nav.dataset.index;
            for(let i=0;i<this.aButtons.length;i++) {
                this.aButtons[i].className = "";
                this.appUtil.myMove_yzy(this.aUnderscores[i],{
                    width: 0,
                    left: (this.aButtons[i].offsetLeft + this.aButtons[i].offsetWidth / 2)
                })
            }
            this.aButtons[index-1].className = "active";
            this.appUtil.myMove_yzy(this.aUnderscores[index-1],{
                width: this.aButtons[index-1].offsetWidth,
                left: this.aButtons[index-1].offsetLeft
            });
        }
    }
}