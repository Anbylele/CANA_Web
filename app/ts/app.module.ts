import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './util/rxjs-extensions';

import { AppUtil } from './util/app.util';
import { UserService } from './service/user.service';
import { UserDetailComponent } from './components/user_profile/user-detail.component';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/main/home.component';
import { DashboardComponent } from "./components/user_profile/dashboard.component";
import { UserSearchComponent } from './components/user_profile/user-search.component';
import { ServiceComponent } from './components/main/service.component';
import { NewsComponent } from './components/main/news.component';
import { FooterComponent } from './components/main/footer.component';
import { HeaderComponent } from './components/main/header.component'
import { AboutComponent } from './components/main/about.component';
import { UserComponent } from './components/user_profile/user.component';
import { RegisterComponent } from './components/login_register/register.component';
import { LoginComponent } from './components/login_register/login.component';
import { ProfileComponent } from './components/user_profile/profile.component';
import { AdminLoginComponent } from './components/login_register/admin-login.component';
import { NoAccessComponent } from './components/error_page/noaccess.component';
import { StudentProfileComponent } from './components/user_profile/student-profile.component';
import { TeacherProfileComponent } from './components/user_profile/teacher-profile.component';
import { AdminProfileComponent } from './components/user_profile/admin-profile.component';
import { NotFoundComponent } from './components/error_page/notfound.component';
import { AdminComponent } from './components/user_profile/admin.component';

import { ScrollingDirective } from './util/scrolling.directive';

import { routing } from './route/app.routing';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        ScrollingDirective,
        NotFoundComponent,
        AdminProfileComponent,
        TeacherProfileComponent,
        StudentProfileComponent,
        NoAccessComponent,
        AdminLoginComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        AboutComponent,
        NewsComponent,
        FooterComponent,
        HeaderComponent,
        ServiceComponent,
        AppComponent,
        UserDetailComponent,
        HomeComponent,
        DashboardComponent,
        UserSearchComponent,
        AdminComponent
    ],
    providers:[
        AppUtil,
        UserService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
