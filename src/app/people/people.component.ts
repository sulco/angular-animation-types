import { AfterViewInit, Component, HostListener, NgZone } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { People } from '../models/people.models';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { timer } from 'rxjs/observable/timer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ts-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('0.4s ease-in-out', style({transform: 'translateX(0%)'}))
          ], {optional: true}),
          query(':leave', [
            style({transform: 'translateX(0%)'}),
            animate('0.4s ease-in-out', style({transform: 'translateX(-100%)'}))
          ], {optional: true}),
        ])
      ]),
    ])
  ]
})
export class PeopleComponent implements AfterViewInit {
  people: People[] = [];
  currentPersonId: string;

  constructor(private route: ActivatedRoute,
              private zone: NgZone,
              private router: Router) {
    this.people = this.route.snapshot.data.people;
  }

  ngAfterViewInit() {
    this.showAvatars();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const offset = {ArrowLeft: -1, ArrowRight: 1}[event.code];
    if (offset) {
      const nextPage = +this.currentPersonId + offset;
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
    const offsetEnter = +newPersonId > +this.currentPersonId ? 100 : -100;
    this.currentPersonId = newPersonId;
    return {
      value: newPersonId.toString(),
      params: {
        offsetEnter,
        offsetLeave: -offsetEnter
      }
    };
  }

  getAvatarsTransform(): string {
    return `translateX(${245 - parseInt(this.currentPersonId, 10) * 100}px)`;
  }

  showAvatars() {
    const avatarSpace = 100;

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const keyframes = (index: number): AnimationKeyFrame[] => {
      return [
        {transform: `translate(${random(10, 350)}px, ${random(-10, -550)}px) scale(0)`},
        {transform: `translate(${(index - 1) * avatarSpace}px, -120px) scale(1)`}
      ];
    };

    const options = (): AnimationEffectTiming => ({
      duration: random(500, 2000),
      easing: 'ease-in-out',
      fill: 'forwards'
    });

    timer(0, 250)
      .pipe(
        take(this.people.length / 2)
      )
      .subscribe(step => {
        [step + 1, this.people.length - step].forEach(index => {
          document.getElementById(`person_${index}`)
            .animate(keyframes(index), options());
        });
      });
  }
}
