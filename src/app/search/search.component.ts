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
  @ViewChild('ind',{ static: false }) ind: ElementRef
  searchList;
  spinner = false;
  country = []
  india = []
  totalWorld;
  indData;
  constructor(private coronaService: GitService) {
 this.search(null);
this.getIndiaData();
  }

  getIndiaData() {
    this.india = [];
    this.coronaService.getAll().subscribe((res) => {
      this.indData = res['total_values']
      this.india.push(['code', 'state', 'Cases'])
        Object.keys(res['state_wise']).forEach((state) => {
          if(res['state_wise'][state]['statecode'] && res['state_wise'][state]['confirmed']) this.india.push([`IN-${res['state_wise'][state]['statecode']}`, state, Number(res['state_wise'][state]['confirmed'])]);
    })
    this.showIndia();
       })
  }
  showIndia() {
      const data = google.visualization.arrayToDataTable(this.india);    
      const chart1 = new google.visualization.GeoChart(this.ind.nativeElement);  
    var options1 = { 
      region: 'IN',
      displayMode: 'regions',
      resolution: 'provinces',
      datalessRegionColor: 'transparent',
        colorAxis: {colors: ['lightgreen', 'white','orange']}
    }
    chart1.draw(data,options1);
    google.visualization.events.addListener(chart1, 'regionClick',this.myClickHandler); 
  }
  myClickHandler(data) {
console.log('323213123',data)
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
      // google.charts.load('current', { 'packages': ['corechart']});
      var myMapsApiKey = 'SomeMagicToSetThis';
      // AIzaSyCU-9VkLPlvT7R1E3oDhFzxvcrT4GoLVSc
google.charts.load('45', { mapsApiKey: myMapsApiKey, packages: [ 'corechart','geochart' ]});
    }
  search(data) {
    this.country = []
    this.spinner = true;
    this.coronaService.getCountries().subscribe((res: any[]) => {
      this.searchList = res['response'];
      this.searchList = this.searchList.sort((a,b) => b.cases.total - a.cases.total);
      this.totalWorld = this.searchList.shift();
      this.searchList.shift();
      if(data) {
        this.searchList = this.searchList.filter((res) => res.country.toLowerCase().includes(data.value.country.toLowerCase()));
      }
      this.country.push(['Country', 'Cases'])
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
