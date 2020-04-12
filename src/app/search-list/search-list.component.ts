import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
@Input() searchList;
flag = {
  1:false,
  2:false,
  3: false,
  4:false,
  5: false
}
  ngOnInit() {
  }

  trackByFn(index, item) {
    return index;
  }


  sort(aa,bb,index) {
    this.flag[index] = !this.flag[index];
      this.searchList = this.flag[index] ? this.searchList.sort((a,b) => b[aa][bb] - a[aa][bb]) :
                                           this.searchList.sort((a,b) => a[aa][bb] - b[aa][bb]);
  }
}
