import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-totaldeatils',
  templateUrl: './totaldeatils.component.html',
  styleUrls: ['./totaldeatils.component.css']
})
export class TotaldeatilsComponent implements OnInit {
@Input() totalWorld;
  constructor() { }

  ngOnInit() {
  }

}
