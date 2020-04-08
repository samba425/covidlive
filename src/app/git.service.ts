import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GitService {

  apiUrl = 'https://coronavirus-19-api.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getAll() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append("x-rapidapi-host", 'corona-virus-world-and-india-data.p.rapidapi.com');
    headers = headers.append("x-rapidapi-key", '9kQ7VQIZPvmshdJ8Tc7jIMQROOdhp1YZyppjsnSgDItnHZYhlP');
        return this.http.get(`https://corona-virus-world-and-india-data.p.rapidapi.com/api_india`,{headers: headers});
  }

  getCountries() {
    let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Accept', 'application/json');
headers = headers.append("x-rapidapi-host", 'covid-193.p.rapidapi.com');
headers = headers.append("x-rapidapi-key", '9kQ7VQIZPvmshdJ8Tc7jIMQROOdhp1YZyppjsnSgDItnHZYhlP');
    return this.http.get(`https://covid-193.p.rapidapi.com/statistics`,{headers: headers});
  } 
}
