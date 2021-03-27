import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';

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

  ngOnInit(): void {
    if ($( window ).width() <= 768) {
      
      $('mat-form-field div div').css('height', '37px');
      $('mat-form-field div div input').css('padding-bottom', '30px');
      $('mat-form-field div div input').css('position', 'absolute');
      $('mat-form-field div div input').css('bottom', '12px');
    }
    this.changeMessage(this.typeFieldUser);
    let superThis = this;
    $('button').click(function(event){
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
