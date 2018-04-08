import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { People } from '../models/people.models';
import { animate, query, style, trigger, transition, group } from '@angular/animations';
import { timer } from 'rxjs/observable/timer';
import { take } from 'rxjs/operators';

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
    setTimeout(() => {
      this.showAvatars();
    }, 100);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const offset = {ArrowLeft: -1, ArrowRight: 1}[event.code];
    if (offset) {
      const nextPage = +this.personId + offset;
      if (nextPage < this.people.length + 1 && nextPage > 0) {
        this.router.navigate([nextPage]);
      }
    }
  }


  getState(outletRef: RouterOutlet) {
    if (!outletRef.isActivated) {
      return;
    }
    const newPersonId = outletRef.activatedRoute.snapshot.params.id;
    const offsetEnter = +newPersonId > +this.personId ? 100 : -100;
    this.personId = newPersonId;
    return {
      value: newPersonId.toString(),
      params: {
        offsetEnter,
        offsetLeave: -offsetEnter
      }
    };
  }

  showAvatars() {
    const keyframes = (index: number): AnimationKeyFrame[] => {
      return [
        {transform: `translate(${(index - 1) * 50}px, 120px)`},
        {transform: `translate(${(index - 1) * 50}px, 0px)`}
      ];
    };

    const options: AnimationEffectTiming = {
      duration: 1000,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      // easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      // easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
      fill: 'forwards'
    };

    timer(0, 150)
      .pipe(
        take(this.people.length / 2)
      )
      .subscribe(step => {
        [step + 1, this.people.length - step].forEach(index => {
          document.getElementById(`person_${index}`)
            .animate(keyframes(index), options);
        });
      });
  }
}
