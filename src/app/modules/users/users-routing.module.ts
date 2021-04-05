import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path:'',
  component:UserPageComponent
  },
 // {path:':id',
//  component:UserDetailsPageComponent
 // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
