import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
  
})
export class MessageComponent implements OnInit {
  data: [];
  messages: string[];

  constructor() { }


  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(){
    var superThis = this;
    setInterval(function(){
      $.get("http://www.localhost/dbGet.php", function(data, status){
          let completeData = JSON.parse(data);
          superThis.data = completeData;
          console.log(superThis.data);
          superThis.messages = Array(superThis.data.length).fill(null);
          let i = 0;
          while (i < superThis.data.length) {
            superThis.messages[i] = superThis.data[i]["message"];
            i++;
          }
          console.log(superThis.messages.length);
          console.log(superThis.messages[0]);
        })

    }, 10);
  }

  sizeIsOne(){
    if (this.messages.length == 1) {
      return true;
    }
    return false;
  }

  getMessage(i:number){
    return this.messages[i];
  }

  logMessage(i:number){
    console.log(this.messages[i]);
  }


}
