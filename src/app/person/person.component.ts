import { Component, HostBinding, OnInit } from '@angular/core';
import { People, Person } from '../models/people.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ts-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: Person;

  constructor(private route: ActivatedRoute) {
    this.route.params
      .subscribe(({id}) => {
        this.person = (this.route.parent.snapshot.data.people as People)
          .find(person => person.id === +id);
      });
  }

  ngOnInit() {
  }

  @HostBinding('style.background')
  get background() {
    return `hsl(${this.hashCode(this.person.email)}, 80%, 10%)`;
  }

  private hashCode(str: string) {
    let hash = 0;
    let i = 0;
    const len = str.length;
    while (i < len) {
      hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0; // tslint:disable-line:no-bitwise
    }
    return hash;
  }
}
