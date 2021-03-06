import { Component, AfterViewInit,OnInit, ElementRef, ViewChild } from '@angular/core';
import { GitService } from '../git.service';
import {  newContryList } from './countrylist';
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
  filteredCountry = [];
  spinner = false;
  country = []
  india = []
  totalWorld;
  indData;
  constructor(private coronaService: GitService) {
    // AIzaSyCU-9VkLPlvT7R1E3oDhFzxvcrT4GoLVSc
   google.charts.load('45', { mapsApiKey: 'SomeMagicToSetThis', packages: [ 'corechart','geochart' ]});
 this.search(null);
this.getIndiaData();
  }
getdist(res) {
  const dist = {}
  if(res) {
    Object.keys(res).forEach(i => {
      if(i) {
        dist[i] = `${res[i]['confirmed']}`
      }
    });
  }
  return JSON.stringify(dist);
  
}
  getIndiaData() {
    this.india = [];
    this.coronaService.getAll().subscribe((res) => {
      this.indData = res['total_values']
      this.india.push(['code', 'description','Cases'])
        Object.keys(res['state_wise']).forEach((state) => {
          if(res['state_wise'][state]['statecode'] && res['state_wise'][state]['confirmed']) this.india.push([`IN-${res['state_wise'][state]['statecode']}`,this.getdist(res['state_wise'][state]['district'] ? res['state_wise'][state]['district'] : undefined), Number(res['state_wise'][state]['confirmed'])]);
    })
    this.showIndia();
       })
  }
  showIndia() {
      const data = google.visualization.arrayToDataTable(this.india);    
      const chart1 = new google.visualization.GeoChart(this.ind.nativeElement);  
    var options1 = { 
      tooltip: { isHtml: true },
      region: 'IN',
      displayMode: 'regions',
      resolution: 'provinces',
      datalessRegionColor: 'transparent',
        colorAxis: {colors: ['lightgreen', 'white','orange']}
    }
    chart1.draw(data,options1);
  }
  myClickHandler(data) {
// console.log('323213123',data)
  }
    drawChart(code) {  
      const data = google.visualization.arrayToDataTable(this.country); 
       var options = { 
      tooltip: { isHtml: true },
      region: code ? code.code: null,
      datalessRegionColor: 'transparent',
      colorAxis: {colors: ['lightgreen', 'lightpink','orange','lightyellow','green','grey','skyblue']}
    }
    
      const chart = new google.visualization.PieChart(this.pieChart.nativeElement);  
      const chart1 = new google.visualization.GeoChart(this.map.nativeElement);
  
    chart.draw(data, options);
    chart1.draw(data,options);
  }
  
    ngAfterViewInit() {
      
    }

    onSearch(data) {
      if(data.length > 1) {
       this.filteredCountry = newContryList.filter((get) => get.name.toLocaleLowerCase().includes(data.toLocaleLowerCase()));
      }
    }
  search(data) {
    this.country = []
    this.spinner = true;
    this.coronaService.getCountries().subscribe((res: any[]) => {
      this.searchList = res['response'];
      const newList = [];
      ["Europe","Asia","South-America","Oceania","North-America","Africa","Diamond-Princess-"].forEach((res) => {
        const index = this.searchList.findIndex((country) => country.country === res);
        newList.push(this.searchList[index]);
        this.searchList.splice(index,1)
      });
     const totalll =  newList.reduce((a,b) => {
        return {
          total: a.total + b.cases.total,
          new: a.new + Number(b.cases.new ? b.cases.new.split('+')[1]: 0),
          active: a.active + b.cases.active,
          recoverd: a.recoverd + Number(b.cases.recovered),
          deaths:a.deaths+ b.deaths.total,
          newD: a.newD + Number(b.deaths.new ? b.deaths.new.split('+')[1] : 0)
        };
      },{total: 0,new: 0,active: 0,recoverd: 0,deaths:0,newD:0});
      this.totalWorld = totalll;
      this.searchList = this.searchList.sort((a,b) => b.cases.total - a.cases.total);
      this.searchList.shift();
      this.country.push(['Country', 'Cases'])
      if(data) {
        this.searchList = this.searchList.filter((res) => res.country.toLowerCase().includes(data.name.toLowerCase()));
        this.country.push(['World',this.totalWorld.total-this.searchList.reduce((a,b) =>   a + b.cases.total,0)]);     
      }
      this.searchList.forEach((element,i) => { 
        if(element.country === "USA") {          
          this.country.push(["United States",element.cases.total]);
        } else {
          this.country.push([element.country,element.cases.total]);
        }
      });
    this.spinner = false;
    this.drawChart(data);
    this.filteredCountry = [];
    },err => this.spinner = false);
  }

  ngOnInit() {
  }

}
