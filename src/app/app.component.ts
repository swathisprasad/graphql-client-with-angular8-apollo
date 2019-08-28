import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.mutate({
      mutation: gql`mutation {
        createVehicle(type: "car", modelCode: "XYZ0192", brandName: "XYZ", launchDate: "2016-08-16") 
        {
          id
        }
      }`
    }).subscribe(data => {
      //successfully created vehicle entity.
    });

    this.apollo.query({
      query: gql`query {
        vehicles(count: 1) 
        {
          modelCode,
          brandName
        }
      }`
    }).subscribe(({ data, loading }) => {
      this.data = data;
    });
  }
}
