import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-type-field',
  templateUrl: './type-field.component.html',
  styleUrls: ['./type-field.component.scss']
})
@Injectable()
export class TypeFieldComponent implements OnInit {

  @Input() typeFieldUser:string;

  private messageSource = new BehaviorSubject<string>("default");
  currentMessage = this.messageSource.asObservable();

  changeMessage(message){
    this.messageSource.next(message);
  }

  ngAfterViewInit(){
    // $('.example-full-width div').eq(0).css('padding', '0');
    // $('.example-full-width div').eq(0).css('margin-bottom', '0');
  }

  ngOnInit(): void {
    // if ($( window ).width() <= 768) {
      
    //   $('mat-form-field div div').css('height', '37px');
    //   $('mat-form-field div div input').css('padding-bottom', '30px');
    //   $('mat-form-field div div input').css('position', 'absolute');
    //   $('mat-form-field div div input').css('bottom', '12px');
    // }

    $('input').focus(function(){
      window.scrollTo(0,document.body.scrollHeight);
    })
    this.changeMessage(this.typeFieldUser);
    let superThis = this;
    $('button').click(function(event){
      document.getElementById("type-field").blur();
      // $('form mat-form-field').removeClass();
      // $('form mat-form-field').addClass('mat-form-field example-full-width ng-tns-c37-1 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-legacy mat-form-field-can-float mat-form-field-has-label ng-star-inserted mat-form-field-hide-placeholder')
      let message = $('input').val();
      $('input').val("");
      // Need to communicate from parent to child to let user = d
      // let user = "admin";
      $.ajax({
        url : "http://91.160.80.51:49152/db.php",
        type : "POST",
        data : "message=" + message + "&user=" + superThis.typeFieldUser
      })
    })
  }

  constructor(private http: HttpClient){}

  

}
