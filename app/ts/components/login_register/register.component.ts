import { Component,ElementRef,AfterViewInit } from '@angular/core';
import { AppUtil } from '../../util/app.util';

@Component({
    moduleId: module.id,
    selector: 'cana-register',
    templateUrl: '../../../template/register.component.html',
    styleUrls: ['../../style/css/register.component.css']
})

export class RegisterComponent implements AfterViewInit{
    constructor(
        private elementRef:ElementRef,
        private appUtil:AppUtil
    ){}

    ngAfterViewInit(): void{
        //page fade in
        let oPage = this.elementRef.nativeElement;
        oPage.style.cssText = 'opacity:0;position:relative;display:block';
        this.appUtil.myMove_yzy(oPage,{'opacity':100},null,6);
    }
}