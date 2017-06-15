import {Component, ElementRef, ViewChild , HostListener} from '@angular/core';
import {AppUtil} from '../../util/app.util';
import {Element} from '../../model/element';

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
    @ViewChild("slide") slide: ElementRef;
    @ViewChild("mslide") mslide: ElementRef;
    @ViewChild("canvas") canvas: ElementRef;

    //HTML elements
    private oMentorList: any;
    private mentorIntro:any;
    private mentorImage: any;
    private mentor: any;
    private oScroll: any;
    private oContainer: any;
    private oSlide: any;
    private oPictures: any;
    private picItems: any[];
    private pictures: any[];
    private discriptions: any[];
    private buttons: any[];
    private picAttributes: [Element];
    private oMSlide: any;
    private oMPictures: any;
    private mPicItems: any[];
    private mPictures: any[];
    private mDiscriptions: any[];
    private mButtons: any[];
    private oButtons: any;
    private oCanvas: any;

    //variables
    private slideDone: boolean;
    private mSlideDone: boolean;

    //data
    private eventPictures: any[];

    constructor(
        private appUtil: AppUtil
    ){}

    ngOnInit(): void {
        this.eventPictures = [
            {
                "url": "app/images/events/DSC04960.jpg",
                "discription": "Description for the photo1"
            },
            {
                "url": "app/images/events/DSC04908.jpg",
                "discription": "Description for the photo2"
            },
            {
                "url": "app/images/events/DSC04939.jpg",
                "discription": "Description for the photo3"
            }
        ];
        this.slideDone = true;
        this.mSlideDone = true;
    }

    ngAfterViewInit(): void {
        this.oCanvas = this.canvas.nativeElement;
        this.oMentorList = this.mentorList.nativeElement;
        this.mentorIntro = this.oMentorList.querySelectorAll(".intro");
        this.mentorImage = this.oMentorList.querySelectorAll(".img");
        this.mentor = this.oMentorList.querySelectorAll(".mentor");
        this.oScroll = this.scroll.nativeElement;
        this.oContainer = this.container.nativeElement;
        this.oSlide = this.slide.nativeElement;
        this.oPictures = this.oSlide.querySelector(".pictures");
        this.picItems = this.oSlide.querySelectorAll(".pic_wrap");
        this.pictures = this.oSlide.querySelectorAll(".picture");
        this.discriptions = this.oSlide.querySelectorAll("p");
        this.buttons = this.oSlide.querySelectorAll(".button");
        this.oMSlide = this.mslide.nativeElement;
        this.oMPictures = this.oMSlide.querySelector(".pictures");
        this.mPicItems = Array.from(this.oMSlide.querySelectorAll(".pic_wrap"));
        this.mPictures = this.oMSlide.querySelectorAll(".picture");
        this.mDiscriptions = this.oMSlide.querySelectorAll("p");
        this.mButtons = this.oMSlide.querySelectorAll(".button");
        this.oButtons = this.oMSlide.querySelector(".buttons");

        //initialize canvas for mentor section
        this.oCanvas.style.width = document.documentElement.offsetWidth + "px";

        //initialize slide section
        this.picAttributes = [new Element(),new Element(),new Element(),new Element(),new Element()];
        this.initializeSlide();
        this.initURL();
        if(document.documentElement.offsetWidth < 700) {
            this.oSlide.style.display = "none";
        }else {
            this.oMSlide.style.display = "none";
        }
        this.mInitSlide();
        this.mInitURL();

        //handle mentor list mentor picture height
        this.handleMentorIntroWidth();
        this.handleMentorPicHeight();

        //handle mobile mentor list drag
        this.oMentorList.ontouchstart = (e) => {
            this.onMobileDrag(e, this.oScroll, this.oContainer, this.oMentorList, 'content');
        };
    }

    //handle the situation when window is re-sized
    @HostListener('window:resize', ['$event']) onResize(event): void{
        this.oCanvas.style.width = document.documentElement.offsetWidth + "px";
        this.handleMentorIntroWidth();
        this.handleMentorPicHeight();

        this.oSlide.style.display = document.documentElement.offsetWidth < 700 ? "none" :  "block";
        this.resetSlide();

        this.oMSlide.style.display = document.documentElement.offsetWidth < 700 ? "block" :  "none";
        this.mInitSlide();
    }

    mInitSlide(): void {
        for(let i=0;i<this.mPicItems.length;i++) {
            this.mPictures[i].style.height = (this.mPicItems[i].offsetWidth * 0.7) + "px";
        }
        this.oMSlide.style.height = (this.mPicItems[0].offsetHeight + this.oButtons.offsetHeight) + "px";
    }

    //initialize picture urls
    initURL(): void {
        this.pictures[0].style.backgroundImage = 'url(' + this.eventPictures[2].url + ')';
        this.discriptions[0].innerHTML = this.eventPictures[2].discription;
        this.pictures[1].style.backgroundImage = 'url(' + this.eventPictures[0].url + ')';
        this.discriptions[1].innerHTML = this.eventPictures[0].discription;
        this.pictures[2].style.backgroundImage = 'url(' + this.eventPictures[1].url + ')';
        this.discriptions[2].innerHTML = this.eventPictures[1].discription;
        this.pictures[3].style.backgroundImage = 'url(' + this.eventPictures[2].url + ')';
        this.discriptions[3].innerHTML = this.eventPictures[2].discription;
        this.pictures[4].style.backgroundImage = 'url(' + this.eventPictures[0].url + ')';
        this.discriptions[4].innerHTML = this.eventPictures[0].discription;
    }

    //initialize picture urls for mobile
    mInitURL(): void {
        this.mPictures[0].style.backgroundImage = 'url(' + this.eventPictures[0].url + ')';
        this.mDiscriptions[0].innerHTML = this.eventPictures[0].discription;
        this.mPictures[1].style.backgroundImage = 'url(' + this.eventPictures[1].url + ')';
        this.mDiscriptions[1].innerHTML = this.eventPictures[1].discription;
        this.mPictures[2].style.backgroundImage = 'url(' + this.eventPictures[2].url + ')';
        this.mDiscriptions[2].innerHTML = this.eventPictures[2].discription;
    }

    //initialize slide section after window resize
    resetSlide(): void {
        this.slideDone = true;
        for(let i=0;i<this.picItems.length;i++) {
            clearInterval(this.picItems[i].timer);
            clearInterval(this.pictures[i].timer);
            this.picAttributes[i].left = i === 2 ? Math.floor(this.oPictures.offsetWidth/2 - 305) : Math.floor((this.oPictures.offsetWidth/2 - 210) + 580*(i - 2));

            this.picItems[i].style.left = this.picAttributes[i].left + "px";
            this.picItems[i].style.top = this.picAttributes[i].top + "px";
            this.picItems[i].style.width = this.picAttributes[i].width + "px";
            this.pictures[i].style.height = this.picAttributes[i].height + "px";
        }
    }

    //handle slide section
    initializeSlide(): void {
        for(let i=0;i<this.picItems.length;i++) {
            this.picAttributes[i].left = i === 2 ? Math.floor(this.oPictures.offsetWidth/2 - 305) : Math.floor((this.oPictures.offsetWidth/2 - 210) + 580*(i - 2));
            this.picAttributes[i].top = this.picItems[i].offsetTop;
            this.picAttributes[i].width = this.picItems[i].offsetWidth;
            this.picAttributes[i].height = this.pictures[i].offsetHeight;

            this.picItems[i].style.left = this.picAttributes[i].left + "px";
            this.picItems[i].style.top = this.picAttributes[i].top + "px";
            this.picItems[i].style.width = this.picAttributes[i].width + "px";
            this.pictures[i].style.height = this.picAttributes[i].height + "px";
        }
    }

    //mentor info section layout responsive
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

    //mentor info section scroll
    onDrag(event, scrollBar, container, mentorList, type): void {
        event.stopPropagation();
        event.preventDefault();
        let timer;
        let init = {
            initialY: event.pageY,
            speed: 0,
            change: event.pageY,
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
            initialY: e.pageY,
            speed: 0,
            change: e.pageY,
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
        let mouseY = e.pageY;
        let moveY = mouseY - init.initialY;
        init.speed = e.pageY - init.change;
        init.change = e.pageY;
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
        let mouseY = e.pageY;
        let moveY = mouseY - init.initialY;
        init.speed = e.pageY - init.change;
        init.change = e.pageY;
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
                    init.markY = e.pageY;
                    init.triggered = true;
                    init.scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
                }
            }
        }
        let percent = Y / bottom;
        let range = container.offsetHeight - scrollBar.offsetHeight;
        mentorList.style.top = Y +  "px";
        scrollBar.style.top = -(range * percent) + "px";
    }

    //desktop slide section
    onButtonClick(button: any): void {
        let active = this.oSlide.querySelector(".activeb");
        if(button.className.toUpperCase().indexOf("ACTIVEB") !== -1 || !this.slideDone) {
            return null;
        }
        this.slideDone = false;
        //button animation
        for(let i=0;i<this.buttons.length;i++) {
            this.buttons[i].className = "button";
        }
        button.className = "button activeb";
        //pictures animation
        let direction = active.dataset.index - button.dataset.index;
        switch(direction){
            case -1:
            case 2:
                this.moveLeft();
                return;
            case 1:
            case -2:
                this.moveRight();
                return;
            default:
                return;
        }
    }

    moveLeft(): void {
        let arrr1: any[] = [];
        let arrr2: any[] = [];
        let arrr3: any[] = [];
        this.pictures[this.pictures.length-1].style.backgroundImage = this.pictures[1].style.backgroundImage;
        this.discriptions[this.pictures.length-1].innerHTML = this.discriptions[1].innerHTML;
        for(let i=0;i<this.picItems.length;i++) {
            if(i === 3) {
                this.picItems[i].className = "pic_wrap active";
            }else {
                this.picItems[i].className = "pic_wrap";
            }
            if(i > 0) {
                arrr1.push(this.picItems[i]);
                arrr2.push(this.pictures[i]);
                arrr3.push(this.discriptions[i]);
                this.appUtil.myMove_yzy(this.picItems[i], {
                    width: this.picAttributes[i-1].width,
                    left: this.picAttributes[i-1].left,
                    top: this.picAttributes[i-1].top,
                }, ()=>{
                    this.slideDone = true;
                });
                this.appUtil.myMove_yzy(this.pictures[i], {
                    height: this.picAttributes[i-1].height
                })
            }else {
                this.picItems[i].style.width = this.picAttributes[this.picItems.length - 1].width + "px";
                this.picItems[i].style.left = this.picAttributes[this.picItems.length - 1].left + "px";
                this.picItems[i].style.top = this.picAttributes[this.picItems.length - 1].top + "px";
                this.pictures[i].style.height = this.picAttributes[this.picItems.length - 1].height + "px";
            }
        }
        arrr1.push(this.picItems[0]);
        arrr2.push(this.pictures[0]);
        arrr3.push(this.discriptions[0]);
        this.picItems = arrr1;
        this.pictures = arrr2;
        this.discriptions = arrr3;
    }

    moveRight(): void {
        let arrl1: any[] = [];
        let arrl2: any[] = [];
        let arrl3: any[] = [];
        this.pictures[0].style.backgroundImage = this.pictures[3].style.backgroundImage;
        this.discriptions[0].innerHTML = this.discriptions[3].innerHTML;
        arrl1.push(this.picItems[this.picItems.length-1]);
        arrl2.push(this.pictures[this.picItems.length-1]);
        arrl3.push(this.discriptions[this.picItems.length-1]);
        for(let i=0;i<this.picItems.length;i++) {
            if(i === 1) {
                this.picItems[i].className = "pic_wrap active";
            }else {
                this.picItems[i].className = "pic_wrap";
            }
            if(i < this.picItems.length-1) {
                arrl1.push(this.picItems[i]);
                arrl2.push(this.pictures[i]);
                arrl3.push(this.discriptions[i]);
                this.appUtil.myMove_yzy(this.picItems[i], {
                    width: this.picAttributes[i+1].width,
                    left: this.picAttributes[i+1].left,
                    top: this.picAttributes[i+1].top,
                }, ()=>{
                    this.slideDone = true;
                });
                this.appUtil.myMove_yzy(this.pictures[i], {
                    height: this.picAttributes[i+1].height
                })
            }else {
                this.picItems[i].style.width = this.picAttributes[0].width + "px";
                this.picItems[i].style.left = this.picAttributes[0].left + "px";
                this.picItems[i].style.top = this.picAttributes[0].top + "px";
                this.pictures[i].style.height = this.picAttributes[0].height + "px";
            }
        }
        this.picItems = arrl1;
        this.pictures = arrl2;
        this.discriptions = arrl3;
    }

    onMobileButtonClick(button: any): void {
        let active = this.oMSlide.querySelector(".activeb");
        if(button.className.toUpperCase().indexOf("ACTIVEB") !== -1 || !this.mSlideDone) {
            return null;
        }
        this.mSlideDone = false;
        //button animation
        for(let i=0;i<this.mButtons.length;i++) {
            this.mButtons[i].className = "button";
        }
        button.className = "button activeb";
        //pictures animation
        let direction = active.dataset.index - button.dataset.index;
        switch(direction){
            case -1:
            case 2:
                this.mMoveLeft();
                return;
            case 1:
            case -2:
                this.mMoveRight();
                return;
            default:
                return;
        }
    }

    mMoveRight(): void {
        for(let i=0;i<this.mPicItems.length;i++) {
            this.mPicItems[i].style.zIndex = (this.mPicItems.length - i) + "";
        }
        this.mPicItems.unshift(this.mPicItems.pop());
        this.mPicItems[0].className = "pic_wrap left";
        this.mPicItems[1].className = "pic_wrap middle";
        this.mPicItems[2].className = "pic_wrap right";
        setTimeout(()=>{
            this.mSlideDone = true;
        }, 600);
    }

    mMoveLeft(): void {
        for(let i=0;i<this.mPicItems.length;i++) {
            this.mPicItems[i].style.zIndex = i + "";
        }
        this.mPicItems.push(this.mPicItems.shift());
        this.mPicItems[0].className = "pic_wrap left";
        this.mPicItems[1].className = "pic_wrap middle";
        this.mPicItems[2].className = "pic_wrap right";
        setTimeout(()=>{
            this.mSlideDone = true;
        }, 600);
    }
}