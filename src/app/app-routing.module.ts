import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleResolver } from './resolvers/people.resolver';
import { PersonComponent } from './person/person.component';

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

class CustomReuseStrategy implements RouteReuseStrategy {

  handlers: {[key: string]: DetachedRouteHandle} = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[route.routeConfig.path] = null;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) return null;
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // return future.routeConfig === curr.routeConfig;
    return curr.component !== PersonComponent;
    // return true;
  }
}


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
