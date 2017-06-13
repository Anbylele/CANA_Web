import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
    moduleId: module.id,
    selector: 'cana-user-detail',
    templateUrl: '../../../template/user-detail.component.html',
    inputs: ['user'],
    styleUrls: ['../../style/css/user-detail.component.css']
})

export class UserDetailComponent implements  OnInit{
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.userService.getUser(id)
                .then(user => this.user = user);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save():void {
        this.userService.update(this.user)
            .then(() => this.goBack());
    }

    user: User;
}
