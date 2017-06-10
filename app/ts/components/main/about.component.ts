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
    @ViewChild("container") container: ElementRef;
    @ViewChild("scroll") scroll: ElementRef;


    private oMentorList: any;
    private mentorIntro:any;
    private mentorImage: any;
    private mentor: any;
    private oScroll: any;
    private oContainer: any;

    constructor(){
    }

    ngAfterViewInit(): void {
        this.oMentorList = this.mentorList.nativeElement;
        this.mentorIntro = this.oMentorList.querySelectorAll(".intro");
        this.mentorImage = this.oMentorList.querySelectorAll(".img");
        this.mentor = this.oMentorList.querySelectorAll(".mentor");
        this.oScroll = this.scroll.nativeElement;
        this.oContainer = this.container.nativeElement;

        //handle mentor list mentor picture height
        this.handleMentorIntroWidth();
        this.handleMentorPicHeight();

        //handle mobile mentor list drag
        this.oMentorList.ontouchstart = (e) => {
            this.onMobileDrag(e, this.oScroll, this.oContainer, this.oMentorList, 'content');
        };
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
            }else {
                this.mentorIntro[i].style.width = "470px"
            }
        }
    }

    onDrag(event, scrollBar, container, mentorList, type): void {
        event.stopPropagation();
        event.preventDefault();
        let timer;
        let init = {
            initialY: event.screenY,
            speed: 0,
            change: event.screenY,
            resistance: 1.1
        };
        let onMove, top, bottom;
        if(type.toUpperCase() === "SCROLLBAR") {
            onMove  = this.onMove;
            top = scrollBar.offsetTop;
            bottom = container.offsetHeight - scrollBar.offsetHeight;
        }else if(type.toUpperCase() === "CONTENT") {
            onMove = this.onContentMove;
            top = mentorList.offsetTop;
            bottom = mentorList.offsetHeight - container.offsetHeight;
        }
        let move = this.move;
        document.addEventListener("mousemove", handleMove, false);
        function handleMove(e){
            onMove(e, top, bottom, init, scrollBar, container, mentorList);
        }
        window.addEventListener("mouseup", function handleUp(){
            clearInterval(timer);
            if(type.toUpperCase() === "CONTENT") {
                timer = setInterval(() => {
                    move(timer, bottom, init, scrollBar, container, mentorList);
                },20);
            }
            document.removeEventListener("mousemove", handleMove, false);
            window.removeEventListener("mouseup", handleUp, false);
        }, false);
    }

    onMobileDrag(event, scrollBar, container, mentorList, type): void {
        event.stopPropagation();
        event.preventDefault();
        let timer;
        let e = event.touches[0];
        let init = {
            initialY: e.screenY,
            speed: 0,
            change: e.screenY,
            resistance: 1.1,
            triggered: false,
            markY: 0,
            scrollTop: document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        };
        let onMove, top, bottom;
        if(type.toUpperCase() === "SCROLLBAR") {
            onMove  = this.onMove;
            init.speed = 0;
            top = scrollBar.offsetTop;
            bottom = container.offsetHeight - scrollBar.offsetHeight;
        }else if(type.toUpperCase() === "CONTENT") {
            onMove = this.onContentMove;
            top = mentorList.offsetTop;
            bottom = mentorList.offsetHeight - container.offsetHeight;
        }
        let move = this.move;
        document.addEventListener("touchmove", handleMove, false);
        function handleMove(ev){
            onMove(ev, top, bottom, init, scrollBar, container, mentorList);
        }
        window.addEventListener("touchend", function handleUp(){
            clearInterval(timer);
            if(type.toUpperCase() === "CONTENT") {
                timer = setInterval(() => {
                    move(timer, bottom, init, scrollBar, container, mentorList);
                },20);
            }
            document.removeEventListener("touchmove", handleMove, false);
            window.removeEventListener("touchend", handleUp, false);
        }, false);
    }

    move(timer, bottom, init, scrollBar, container, mentorList): void {
        let Y = init.speed + mentorList.offsetTop;
        if(Y > 0) {
            Y = 0;
            init.speed = 0;
            clearInterval(timer);
        }else if(Y < -bottom) {
            init.speed = 0;
            Y = -bottom;
            clearInterval(timer);
        }
        init.speed = init.speed/init.resistance;
        if(Math.abs(init.speed) < 1) {
            clearInterval(timer);
        }

        let percent = Y / bottom;
        let range = container.offsetHeight - scrollBar.offsetHeight;
        mentorList.style.top = Y +  "px";
        scrollBar.style.top = -(range * percent) + "px";
    }

    onMove(event, barTop, bottom, init, scrollBar, container, mentorList): void {
        event.stopPropagation();
        event.preventDefault();
        let e = event.touches ? event.touches[0] : event;
        let mouseY = e.screenY;
        let moveY = mouseY - init.initialY;
        init.speed = e.screenY - init.change;
        init.change = e.screenY;
        let Y = moveY + barTop;
        if(Y < 0) {
            Y = 0;
        }else if(Y > bottom) {
            Y = bottom;
        }
        let percent = Y / bottom;
        let range = mentorList.offsetHeight - container.offsetHeight;
        mentorList.style.top = -(range * percent) + "px";
        scrollBar.style.top = Y + "px";
    }

    onContentMove(event, contentTop, bottom, init, scrollBar, container, mentorList): void {
        if(!event.touches) {
            event.stopPropagation();
            event.preventDefault();
        }
        let e = event.touches ? event.touches[0] : event;
        let mouseY = e.screenY;
        let moveY = mouseY - init.initialY;
        init.speed = e.screenY - init.change;
        init.change = e.screenY;
        let Y = moveY + contentTop;
        if(Y >= 0) {
            Y = 0;
        }else if(Y <= -bottom) {
            Y = -bottom;
        }else {
            init.triggered = false;
        }
        if (Y === 0 || Y === -bottom){
            if(event.touches){
                if(!init.triggered) {
                    init.markY = e.screenY;
                    init.triggered = true;
                    init.scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
                }
                document.documentElement.scrollTop = init.scrollTop - e.screenY + init.markY;
                document.body.scrollTop = init.scrollTop - e.screenY + init.markY;
            }
        }
        let percent = Y / bottom;
        let range = container.offsetHeight - scrollBar.offsetHeight;
        mentorList.style.top = Y +  "px";
        scrollBar.style.top = -(range * percent) + "px";
    }
}