import {Component, ElementRef, ViewChild , HostListener} from '@angular/core';
import {listeners} from "cluster";

@Component({
    moduleId: module.id,
    selector: 'MainAbout',
    templateUrl: '../../../template/about.component.html',
    styleUrls: ['../../../style/css/about.component.css']
})

export class AboutComponent{
    @ViewChild("mentorList") mentorList: ElementRef;

    private oMentorList: any;
    private mentorIntro:any;
    private mentorImage: any;
    private mentor: any;

    constructor(){
    }

    ngAfterViewInit(): void {
        this.oMentorList = this.mentorList.nativeElement;
        this.mentorIntro = this.oMentorList.querySelectorAll(".intro");
        this.mentorImage = this.oMentorList.querySelectorAll(".img");
        this.mentor = this.oMentorList.querySelectorAll(".mentor");

        //handle mentor list mentor picture height
        this.handleMentorIntroWidth();
        this.handleMentorPicHeight();
    }

    @HostListener('window:resize', ['$event']) onResize(event): void{
        this.handleMentorIntroWidth();
        this.handleMentorPicHeight();
    }

    handleMentorPicHeight(): void {
        for(let i=0;i<this.mentorIntro.length;i++) {
            this.mentorImage[i].style.height = this.mentorIntro[i].offsetHeight + "px";
        }
    }

    handleMentorIntroWidth(): void {
        for(let i=0;i<this.mentorIntro.length;i++) {
            let marginLeft = parseInt(window.getComputedStyle(this.mentorIntro[i]).marginLeft);
            let marginRight = parseInt(window.getComputedStyle(this.mentorIntro[i]).marginRight);
            let width = this.mentor[i].offsetWidth - parseInt(window.getComputedStyle(this.mentor[i]).paddingLeft) - parseInt(window.getComputedStyle(this.mentor[i]).paddingRight);
            if(width < 470 + marginLeft + marginRight + this.mentorImage[i].offsetWidth) {
                this.mentorIntro[i].style.width = (width - this.mentorImage[i].offsetWidth - marginLeft - marginRight - 2) + "px";
                console.log("in");
            }else {
                this.mentorIntro[i].style.width = "470px"
            }
        }
    }
}