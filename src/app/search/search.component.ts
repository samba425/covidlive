import { Component, OnInit } from '@angular/core';
import { GitService } from '../git.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
 searchList;
 spinner = false;
  constructor(private coronaService: GitService) {
 this.search(null);
   }

  search(data) {
    this.spinner = true;
    this.coronaService.getCountries().subscribe((res) => {
      this.searchList = res;
      if(data) {
        this.searchList = this.searchList.filter((res) => res.country.toLowerCase().includes(data.value.country.toLowerCase()));
      }
      this.searchList = this.searchList.sort((a,b) => b.cases - a.cases);
    this.spinner = false;
    if(data) data.reset();
    },err => this.spinner = false);
  }

  ngOnInit() {
  }

}
