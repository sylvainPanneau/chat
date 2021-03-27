import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat';

  message: string = null;

  ngOnInit():void{
  }

  receiveMessage($event){
    this.message = $event;
  }

  userNull(){
    return this.message == null;
  }

  getMessage(){
    return this.message;
  }
  
}
