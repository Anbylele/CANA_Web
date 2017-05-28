import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/main/home.component';
import { UserDetailComponent } from '../components/user_profile/user-detail.component';
import { RegisterComponent } from '../components/login_register/register.component';
import { ProfileComponent } from '../components/user_profile/profile.component';
import { AdminLoginComponent } from '../components/login_register/admin-login.component';
import { NoAccessComponent } from '../components/error_page/noaccess.component';
import { StudentProfileComponent } from '../components/user_profile/student-profile.component';
import { TeacherProfileComponent } from '../components/user_profile/teacher-profile.component';
import { AdminProfileComponent } from '../components/user_profile/admin-profile.component';
import { NotFoundComponent } from '../components/error_page/notfound.component';
import { AdminComponent } from '../components/user_profile/admin.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'user/:id',
        component: UserDetailComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        children:[
            {path:'',redirectTo:'error',pathMatch:'full'},
            {path:'error',component:NoAccessComponent},
            {path:'student',component:StudentProfileComponent},
            {path:'teacher',component:TeacherProfileComponent}
        ]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        children:[
            {path:'',redirectTo:'login',pathMatch:'full'},
            {path:'login',component:AdminLoginComponent},
            {path:'profile',component:AdminProfileComponent}
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },{
        path: '**',
        component: NotFoundComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
