import { Injectable } from '@angular/core';

//this service is used to store some of my own tools and globally used functions.
@Injectable()
export class AppUtil{
    //my animation
    myMove_yzy(obj,json,endFn=null,speed=3,type='ease'): void{
        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            //console.log('running');
            var bBtn = true;
            for(var attr in json){
                var iCur = 0;
                if(attr == 'opacity'){
                    iCur = Math.round(getStyle(obj,attr)*100);
                }else if(attr == 'scrollTop'){
                    iCur = Math.floor(obj.scrollTop);
                }else{
                    iCur = parseInt(getStyle(obj,attr)) || 0;
                }
                var iSpeed;
                if(type == 'ease'){
                    iSpeed = (json[attr] - iCur)/speed;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    if(iCur!=json[attr]){
                        bBtn = false;
                    }
                }else if(type == 'linear'){
                    iSpeed = speed;
                    iSpeed = (json[attr] - iCur) > 0 ? iSpeed : -iSpeed;
                    if(Math.abs(iCur-json[attr]) > speed){
                        bBtn = false;
                    }
                }

                if(attr == 'opacity'){
                    obj.style.opacity = (iCur + iSpeed)/100;
                }else if(attr == 'scrollTop'){
                    obj[attr] = iCur + iSpeed;
                }else{
                    obj.style[attr] = iCur + iSpeed + 'px';
                }

                if(Math.abs(iCur-json[attr]) < Math.abs(iSpeed)){
                    if(attr == 'opacity'){
                        obj.style.opacity = json[attr]/100;
                    }else if(attr == 'scrollTop'){
                        obj[attr] = json[attr];
                    }else{
                        obj.style[attr] = json[attr] + 'px';
                    }
                }
            }
            if(bBtn){
                clearInterval(obj.timer);
                if(endFn){
                    endFn.call(obj);
                }
            }
        },30);
        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj)[attr];
            }
        }
    }

    //section toggle
    handleSection(event:any, sectionContent, wrapper, parent=null, siblings=[]): void{
        let height = Math.ceil(wrapper.offsetHeight);
        if(!sectionContent.isOpen){
            let sHeight = 0;
            this.myMove_yzy(sectionContent,{height: height});
            for(let i=0;i<siblings.length;i++){
                this.myMove_yzy(siblings[i],{height: 0});
                siblings[i].isOpen = false;
                sHeight += siblings[i].offsetHeight;
            }
            if(parent){
                let pHeight = parent.querySelector(".wrapper").offsetHeight+height-sHeight;
                this.myMove_yzy(parent,{height: pHeight});
            }
            sectionContent.isOpen = true;
        } else{
            this.myMove_yzy(sectionContent,{height: 0});
            if(parent){
                let pHeight = parent.querySelector(".wrapper").offsetHeight-height;
                this.myMove_yzy(parent,{height: pHeight});
            }
            sectionContent.isOpen = false;
        }
    }
}