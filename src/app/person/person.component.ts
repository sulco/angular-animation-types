import { Component, HostBinding } from '@angular/core';
import { People, Person } from '../models/people.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ts-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  person: Person;

  constructor(private route: ActivatedRoute) {
    this.route.params
      .subscribe(({id}) => {
        this.person = (this.route.parent.snapshot.data.people as People)
          .find(person => person.id === +id);
      });
  }

  @HostBinding('style.background-image')
  get background() {
    return `url(https://source.unsplash.com/collection/100${this.person.id}/weekly)`;
  }
}
