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

  previousAmountMessages: number;

  constructor(private msg: TypeFieldComponent) {  }

  ngAfterViewInit(){
    // let formHeight = $('form mat-card').eq(0).height();
    // let that = $('app-message mat-card');
    // $('app-message mat-card').eq(that.length-1).css('margin-bottom', formHeight/1.69+"px");
    
    // ATTENTION --- Je mets ma div apres un view init donc plus d'effet à chaque envoie de message... Inutile
    // Voir aussi si c'est possible de changer de couleur de task bar... Mais je crois que c'est faisable que pour la status bar en haut.
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
    if ($('app-message mat-card').length != this.previousAmountMessages){
      setTimeout(function(){
        window.scrollTo(0,document.body.scrollHeight);
      }, 5);    
    }
    this.previousAmountMessages = $('app-message mat-card').length;
    return this.messages[i];
  }

  logMessage(i:number){
    console.log(this.messages[i]);
  }

  getAuthor(i:number){
    return this.authors[i];
  }

  isLogged(i:number){
    // return true;
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
