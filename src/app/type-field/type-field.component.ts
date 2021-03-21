import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-type-field',
  templateUrl: './type-field.component.html',
  styleUrls: ['./type-field.component.scss']
})
export class TypeFieldComponent implements OnInit {

  

  ngOnInit(): void {
    $('button').click(function(event){
      let message = $('input').val();
      $('input').val("");
      let user = "admin";
      $.ajax({
        url : "http://www.localhost/db.php",
        type : "POST",
        data : "message=" + message + "&user=" + user
      })
    })
  }

  readonly ROOT_URL = "http://www.localhost/db.php";

  constructor(private http: HttpClient){}

  

}
