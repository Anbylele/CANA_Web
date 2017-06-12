import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/User';
import { UserService } from '../../service/user.service';

@Component({
    moduleId: module.id,
    selector: 'cana-useres',
    templateUrl: '../../../template/user.component.html',
    styleUrls: ['../../style/css/user.component.css']
})

export class UserComponent implements OnInit{
    users:User[];
    selectedUser:User;

    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    onSelect(user:User): void{
        this.selectedUser = user;
    }

    getUseres(): void {
        this.userService.getUsers().then(users=>this.users=users);
    }

    ngOnInit(): void{
        this.getUseres();
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedUser.id]);
    }

    add(name: string): void{
        name = name.trim();
        if (!name) { return; }
        this.userService.create(name)
            .then(user => {
                this.users.push(user);
                this.selectedUser = null;
            });
    }

    delete(user:User): void{
        this.userService
            .delete(user.id)
            .then(() => {
                this.users = this.users.filter(h => h !== user);
                if (this.selectedUser === user) { this.selectedUser = null; }
            });
    }
}