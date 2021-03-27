import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.username = null;
  }

  sendData(){
    this.username = $('input').val();
    this.sendMessage();
  }

  usernameIsNull() {
    return this.username === null;
  }

  sendMessage() {
    this.messageEvent.emit(this.username);
  }

}
