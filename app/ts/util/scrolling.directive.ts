import { Directive,ElementRef,HostListener,OnInit,Input } from '@angular/core';
import { AppUtil } from './app.util';

@Directive({
    selector: '[scrolling]'
})

export class ScrollingDirective implements OnInit{
    private oElem:any;
    private i:number = 0;
    private num:number = 0;
    private defautContent = 'Hello everybody, welcome to CANA!';
    private content:Array<String> = null;

    @Input('scrolling') announcement:Promise<any>;

    constructor(private el:ElementRef, private AppUtil:AppUtil){
        this.oElem = el.nativeElement;
    }

    ngOnInit(): void{
        this.announcement.then(function success(data){
            if(data){
                this.content = data;
                this.num = this.content.length;
                this.oElem.innerHTML = this.content[this.i];
                setTimeout(function(){this.rolling(this.oElem);}.bind(this),888);
            }
            else{
                this.content = [this.defautContent];
                this.num = this.content.length;
                this.oElem.innerHTML = this.defautContent;
                setTimeout(function(){this.rolling(this.oElem);}.bind(this),888);
            }
        }.bind(this),function fail(){
            this.content = [this.defautContent];
            this.num = this.content.length;
            this.oElem.innerHTML = this.defautContent;
            setTimeout(function(){this.rolling(this.oElem);}.bind(this),888);
        }.bind(this));
    }

    @HostListener('mouseenter') onMouseEnter(){
        clearInterval(this.oElem.timer);
    }

    @HostListener('mouseleave') onMouseLeave(){
        this.rolling(this.oElem);
    }

    rolling(oElem): void{
        var length = oElem.offsetWidth;
        this.AppUtil.myMove_yzy(oElem,{left:(-length-18)},function (){
            this.i++;
            if(this.i>=this.num){
                this.i = 0;
            }
            oElem.style.left = 500 + 'px';
            oElem.innerHTML = this.content[this.i];
            setTimeout(function(){this.rolling(oElem);}.bind(this),1888);
        }.bind(this),2,'linear');
    }
}