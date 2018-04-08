import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleResolver } from './resolvers/people.resolver';
import { PersonComponent } from './person/person.component';
import { CustomReuseStrategy } from './route-reuse-strategy';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    resolve: {
      people: PeopleResolver
    },
    children: [
      {
        path: ':id',
        component: PersonComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    PeopleResolver,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
