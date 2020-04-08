import { Component, AfterViewInit,OnInit, ElementRef, ViewChild } from '@angular/core';
import { GitService } from '../git.service';
declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart',{ static: false }) pieChart: ElementRef
  @ViewChild('map',{ static: false }) map: ElementRef
  searchList;
  spinner = false;
  country = []
  totalWorld;
 
  constructor(private coronaService: GitService) {
 this.search(null);
    }
    drawChart() {  
      const data = google.visualization.arrayToDataTable(this.country);
      const options = {
        title: 'Covid Cases',
        legend: {position: 'top'}
      };
    
      const chart = new google.visualization.PieChart(this.pieChart.nativeElement);  
      const chart1 = new google.visualization.GeoChart(this.map.nativeElement);
  
    chart.draw(data, options);
    chart1.draw(data);
  }
  
    ngAfterViewInit() {
      google.charts.load('current', { 'packages': ['corechart']});
    }
  search(data) {
    this.country = []
    this.spinner = true;
    this.coronaService.getCountries().subscribe((res: any[]) => {
      this.searchList = res['response'];
      if(data) {
        this.searchList = this.searchList.filter((res) => res.country.toLowerCase().includes(data.value.country.toLowerCase()));
      }
      this.searchList = this.searchList.sort((a,b) => b.cases.total - a.cases.total);
      this.totalWorld = this.searchList.shift();
      this.searchList.shift();
      this.country.push(['Country', 'Popularity'])
      this.searchList.forEach((element,i) => {
        if(element.country === "USA") {          
          this.country.push(["United States",element.cases.total]);
        } else {
          this.country.push([element.country,element.cases.total]);
        }
      });
    this.spinner = false;
    this.drawChart();
    if(data) data.reset();
    },err => this.spinner = false);
  }

  ngOnInit() {
  }

}
