import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';


@Component({
    moduleId: module.id,
    selector: 'cana-dashboard',
    templateUrl: '../../../template/dashboard.component.html',
    styleUrls:['../../style/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    users: User[] = [];

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUsers()
            .then(heroes => this.users = heroes.slice(0, 4));
    }

    gotoDetail(hero: User): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}
