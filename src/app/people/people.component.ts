import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { People } from '../models/people.models';
import { animate, query, style, trigger, transition, group } from '@angular/animations';

@Component({
  selector: 'ts-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        // cubic-bezier(0.68, -0.55, 0.265, 1.55)
        group([
          query(':enter', [
            style({transform: 'translateX({{offsetEnter}}%)'}),
            animate('0.4s ease-in-out', style({transform: 'translateX(0%)'}))
          ], {optional: true}),
          query(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.4s ease-in-out', style({transform: 'translateX({{offsetLeave}}%)'}))
          ], {optional: true}),
        ])
      ]),
    ])
  ]
})
export class PeopleComponent {
  people: People[] = [];
  private personId: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.people = this.route.snapshot.data.people;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const offset = {ArrowLeft: -1, ArrowRight: 1}[event.code];
    if (offset) {
      const nextPage = +this.personId + offset;
      if (nextPage < this.people.length && nextPage > 0) {
        this.router.navigate([nextPage]);
      }
    }
  }


  getState(outletRef: RouterOutlet) {
    const newPersonId = outletRef.activatedRoute.snapshot.params.id;
    const offsetEnter = newPersonId > this.personId ? 100 : -100;
    this.personId = newPersonId;
    return {
      value: newPersonId.toString(),
      params: {
        offsetEnter,
        offsetLeave: -offsetEnter
      }
    };
  }
}
