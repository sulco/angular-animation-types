import { Component, HostBinding, OnInit } from '@angular/core';
import { People, Person } from '../models/people.models';
import { ActivatedRoute } from '@angular/router';
import Vibrant = require('node-vibrant');

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
    Vibrant.from('/assets/Karley_Dach@jasper.info.png').getPalette((err, palette) => {
      if (err) {
        console.error(err);
      } else {
        console.log(palette);
      }
    });
  }

  @HostBinding('style.background')
  get background() {
    return `hsl(${this.hashCode(this.person.email)}, 80%, 20%)`;
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
