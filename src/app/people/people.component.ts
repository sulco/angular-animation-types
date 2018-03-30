import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from '../models/people.models';

@Component({
  selector: 'ts-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: People[] = [];

  constructor(private route: ActivatedRoute) {
    this.people = this.route.snapshot.data.people;
  }

  ngOnInit() {
  }
}
