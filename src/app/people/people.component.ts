import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { People } from '../models/people.models';
import { animate, query, style, trigger, transition, group } from '@angular/animations';

@Component({
  selector: 'ts-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        // query(':enter', style({transform: 'translateX(-50%)'}), {optional: true}),
        // query(':enter, :leave', style({position: 'fixed', width: '100%'}), {optional: true}),
        // style({transform: 'translateX({{initialOffset}}%)'}),
        // animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))

        group([
          query(':enter', [
            style({transform: 'translateX({{offsetEnter}}%)'}),
            animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))
          ], {optional: true}),
          query(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.3s ease-in-out', style({transform: 'translateX({{offsetLeave}}%)'}))
          ], {optional: true}),
        ])
      ]),
      // transition('void => *', [
      //   style({transform: 'translateX(0%)'}),
      //   animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
      // ])
    ])
  ]
})
export class PeopleComponent implements OnInit {
  people: People[] = [];
  private personId: string;

  constructor(private route: ActivatedRoute) {
    console.log('NEW!');
    this.people = this.route.snapshot.data.people;
  }

  ngOnInit() {
  }

  getState(outletRef: RouterOutlet) {
    const newPersonId = outletRef.activatedRoute.snapshot.params.id;
    const offsetEnter = newPersonId > this.personId ? 100 : -100;
    const offsetLeave = -offsetEnter;
    this.personId = newPersonId;
    // console.log(newPersonId);
    return {
      value: newPersonId.toString(),
      params: {
        offsetEnter,
        offsetLeave
      }
    };
  }
}
