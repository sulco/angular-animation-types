import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import {HttpClientModule} from "@angular/common/http";
import { PersonComponent } from './person/person.component';


@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
