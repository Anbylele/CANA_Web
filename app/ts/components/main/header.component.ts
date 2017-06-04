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
    @ViewChild('navb') navb:ElementRef;
    @ViewChild('navm') navm:ElementRef;
    @ViewChild('header') header:ElementRef;
    @ViewChild('overlap') overlap:ElementRef;
    @ViewChild('navbody') navbody:ElementRef;

    private oHeader: HTMLElement;
    private oLoginButton: any;
    private aNav: any;
    private aNavm: any;
    private aUnderscore: any;
    private aUnderscorem: any;

    constructor(
        private global: Global,
        private appUtil: AppUtil
    ){}

    ngAfterViewInit(): void {
        //handle nav bar animation
        let oNav = this.nav.nativeElement;
        let oNavm = this.navm.nativeElement;
        this.aUnderscore = oNav.querySelectorAll(".underscore");
        this.aUnderscorem = oNavm.querySelectorAll(".underscore");
        let oActive = oNav.querySelector('.active');
        let oActivem = oNavm.querySelector('.active');
        let left = oActive.offsetLeft;
        let width = oActive.offsetWidth;
        let leftm = oActivem.offsetLeft;
        let widthm = oActivem.offsetWidth;
        this.aUnderscore[oActive.dataset.index-1].style.left = left +'px';
        this.aUnderscore[oActive.dataset.index-1].style.width = width +'px';
        this.aUnderscorem[oActive.dataset.index-1].style.left = leftm +'px';
        this.aUnderscorem[oActive.dataset.index-1].style.width = widthm +'px';

        //get header's height
        this.oHeader = this.header.nativeElement;
        this.global.setHeaderHeight(this.oHeader.offsetHeight);

        //get login button
        this.oLoginButton = this.oHeader.querySelector('.login');

        //get nav array
        this.aNav = oNav.querySelectorAll('.nav');
        this.aNavm = oNavm.querySelectorAll('.nav');
        for(let i=0;i<this.aNav.length;i++) {
            this.aUnderscore[i].style.left = this.aNav[i].offsetLeft + "px";
        }
        for(let i=0;i<this.aNavm.length;i++) {
            this.aUnderscorem[i].style.left = this.aNavm[i].offsetLeft + "px";
            this.aUnderscorem[i].style.top = this.aNavm[i].offsetTop + "px";
        }

        //initialize header bar
        this.handleHeader();
    }

    ngOnInit(): void {
    }

    @HostListener('window:scroll', ['$event']) onScroll(event): void{
        this.handleHeader();
    }

    @HostListener('window:resize', ['$event']) onResize(event): void{
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

    onButtonClick(oButton): void {
        if(oButton.className !== "nav active"){
            for (let i=0;i<this.aNav.length;i++){
                this.aNav[i].className = "nav";
                this.appUtil.myMove_yzy(this.aUnderscore[i],{
                    width: 0,
                    left: (this.aNav[i].offsetWidth / 2 + this.aNav[i].offsetLeft)
                })
            }
            for (let i=0;i<this.aNavm.length;i++){
                this.aNavm[i].className = "nav";
                this.appUtil.myMove_yzy(this.aUnderscorem[i],{
                    width: 0,
                    left: (this.aNavm[i].offsetWidth / 2 + this.aNavm[i].offsetLeft)
                })
            }
            this.aNav[oButton.dataset.index-1].className = "nav active";
            this.aNavm[oButton.dataset.index-1].className = "nav active";
            let width = this.aNav[oButton.dataset.index-1].offsetWidth;
            let left = this.aNav[oButton.dataset.index-1].offsetLeft;
            let width2 = this.aNavm[oButton.dataset.index-1].offsetWidth;
            let left2 = this.aNavm[oButton.dataset.index-1].offsetLeft;
            this.appUtil.myMove_yzy(this.aUnderscore[oButton.dataset.index-1],{
                width: width,
                left: left
            });
            this.appUtil.myMove_yzy(this.aUnderscorem[oButton.dataset.index-1],{
                width: width2,
                left: left2
            });
        }
    }

    onClose(overlap: HTMLElement, nav: HTMLElement): void {
        let width = nav.offsetWidth;
        this.appUtil.myMove_yzy(nav, {
            right: -width
        });
        this.appUtil.myMove_yzy(overlap, {
            opacity: 0
        }, ()=>{
            overlap.style.width = "0";
            overlap.style.height = "0";
        });
    }

    onNav(overlap: HTMLElement, nav: HTMLElement): void {
        overlap.style.width = "100%";
        overlap.style.height = "100%";
        this.appUtil.myMove_yzy(overlap, {
            opacity: 100
        });
        this.appUtil.myMove_yzy(nav, {
            right: 0
        });
    }
}