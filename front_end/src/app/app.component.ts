import { Component, OnInit } from '@angular/core';
import { CardsService } from './Service/cards.service';
import { Card } from './model/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cards';
  cards: Card[] = [];
  card: Card = {
    id: '',
    cardnumber: '',
    cardholdername: '',
    expirymonth: '',
    expiryyear: '',
    cvc: '',
  };

  constructor(private CardsService: CardsService) {}
  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.CardsService.getAllCards().subscribe((Response) => {
      this.cards = Response;
      //console.log(Response)
    });
  }
  onSubmit() {
    if (this.card.id === '') {
       // console.log(this.card);
    this.CardsService.addCard(this.card).subscribe((Response) => {
      //  console.log(Response);
      this.getAllCards();
      this.card = {
        id: '',
        cardnumber: '',
        cardholdername: '',
        expirymonth: '',
        expiryyear: '',
        cvc: '',
      };
    });
    } else{
      this.updateCard(this.card);
    }

   
  }
  deleteCard(id: string) {
    this.CardsService.deleteCard(id).subscribe((Response) => {
      this.getAllCards();
    });
  }
  populateForm(card: Card) {
    this.card = card;
  }

  updateCard(card: Card){
    this.CardsService.updateCard(card)
    .subscribe(
      Response => {
        this.getAllCards();
      }
    );

  }
}
