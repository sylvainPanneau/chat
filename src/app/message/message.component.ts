import { Component, Input, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { TypeFieldComponent } from '../type-field/type-field.component';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
  
})
export class MessageComponent implements OnInit, AfterViewInit {
  data: [];
  messages: string[];
  authors: string[];

  lastHeight: number;

  obsMsg:string;

  previousMessageOffset: number;

  constructor(private msg: TypeFieldComponent) {  }

  ngAfterViewInit(){
    this.resizeCard();
  }

  ngOnInit(): void {
    this.getMessages();
    this.msg.currentMessage.subscribe(message => this.obsMsg = message)
  }

  getMessages(){
    var superThis = this;
    setInterval(function(){
      $.get("http://91.160.80.51:49152/dbGet.php", function(data, status){
          let completeData = JSON.parse(data);
          superThis.data = completeData;
          // console.log(superThis.data);
          superThis.messages = Array(superThis.data.length).fill(null);
          superThis.authors = Array(superThis.data.length).fill(null);
          let i = 0;
          while (i < superThis.data.length) {
            superThis.messages[i] = superThis.data[i]["message"];
            superThis.authors[i] = superThis.data[i]["user"];
            i++;
          }
          superThis.lastHeight = $('mat-card:last-of-type').css('height');
        })

    }, 1000);
  }

  sizeIsOne(){
    if (this.messages.length == 1) {
      return true;
    }
    return false;
  }

  getMessage(i:number){    
    if (($('app-message mat-card').eq($('app-message mat-card').length-1).offset().top >= $('form mat-card').eq(0).offset().top-$('form mat-card').eq(0).offset().top*0.1) && ($('app-message mat-card').eq($('app-message mat-card').length-1).offset().top != this.previousMessageOffset)) {
      if ($( window ).width() <= 768) {
        $('.useless').css('height', $('form mat-card').eq(0).height()/1.5);
      }
      else{
        $('.useless').css('height', $('form mat-card').eq(0).height()*2);
      }
      window.scrollTo(0,document.body.scrollHeight);
    }
    this.previousMessageOffset = $('app-message mat-card').eq($('app-message mat-card').length-1).offset().top
    return this.messages[i];
  }

  logMessage(i:number){
    console.log(this.messages[i]);
  }

  getAuthor(i:number){
    return this.authors[i];
  }

  isLogged(i:number){
    return this.getAuthor(i) == this.obsMsg;
  }

  setStyle(){
    return {'height':this.lastHeight*1};
  }

  autoScroll(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  resizeCard(){
    // $('app-message mat-card').each(function(){
    //   $(this).css('width', $(this).children().eq(0).width());
    // })
    
    // $('app-message .me').each(function(){
    //   $(this).css('margin-left', $(this).offset({ top: $(this).offset().top, left: -($(this).children().children().eq(0).width()/1.2-$(window).width()+$(this).outerWidth())}));
    // })
  }


}
