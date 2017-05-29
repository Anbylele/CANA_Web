import { Injectable } from '@angular/core';

@Injectable()
export class Global{
    private headerHeight:number = 0;

    getHeaderHeight(): number {
        return this.headerHeight;
    }

    setHeaderHeight(height: number): void {
        this.headerHeight = height;
    }
}