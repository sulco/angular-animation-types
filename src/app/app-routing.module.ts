import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {PeopleComponent} from "./people/people.component";
import { PeopleResolver } from './resolvers/people.resolver';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    resolve: {
      people: PeopleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    PeopleResolver
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
