import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import {Global} from '../../util/global';
import {AppUtil} from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'MainHeader',
    templateUrl: '../../../template/header.component.html',
    styleUrls: ['../../../style/css/header.component.css']
})

export class HeaderComponent{
    @ViewChild('nav') nav:ElementRef;
    @ViewChild('header') header:ElementRef;

    private oHeader: HTMLElement;
    private oLoginButton: any;
    private aNav: [HTMLElement];
    private oUnderscore: HTMLElement;

    constructor(
        private global: Global,
        private appUtil: AppUtil
    ){}

    ngAfterViewInit(): void {
        //handle nav bar animation
        let oNav = this.nav.nativeElement;
        this.oUnderscore = oNav.querySelector('.underscore');
        let oActive = oNav.querySelector('.active');
        let left = oActive.offsetLeft;
        let width = oActive.offsetWidth;
        this.oUnderscore.style.left = left + "px";
        this.oUnderscore.style.width = width + "px";

        //get header's height
        this.global.setHeaderHeight(this.oHeader.offsetHeight);

        //get login button
        this.oLoginButton = this.oHeader.querySelector('.login');

        //get nav array
        this.aNav = oNav.querySelectorAll('.nav');

        //initialize header bar
        this.handleHeader();
    }

    ngOnInit(): void {
        this.oHeader = this.header.nativeElement;
    }

    @HostListener('window:scroll', ['$event']) onScroll(event): void{
        this.handleHeader();
    }

    handleHeader(): void {
        if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
            this.oHeader.style.backgroundColor = "#fbfbfb";
            this.oHeader.style.position = "fixed";
            this.oHeader.style.top = "0";
            this.oLoginButton.style.backgroundColor = "#c7e5dd";
            this.oHeader.style.borderBottom = "2px solid #e8e8e8";
        } else {
            this.oHeader.style.backgroundColor = "transparent";
            this.oHeader.style.position = "relative";
            this.oLoginButton.style.backgroundColor = "#ffffff";
            this.oHeader.style.borderBottom = "2px solid transparent";
        }
    }

    onButtonClick(oButton) {
        for (let i=0;i<this.aNav.length;i++){
            this.aNav[i].className = "nav";
        }
        oButton.className = "nav active";
        this.appUtil.myMove_yzy(this.oUnderscore,{
            width: oButton.offsetWidth,
            left: oButton.offsetLeft
        });
    }
}