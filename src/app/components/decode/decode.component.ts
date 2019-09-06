import { Component, OnInit } from '@angular/core';
import { decode, DeckDefinition } from 'deckstrings';
import {CardsService} from '../../services/cards.service';

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.scss']
})
export class DecodeComponent implements OnInit {
  public deckString: string;
  public cards;
  public loading: boolean;
  public errorLoadCards: boolean;
  public errorDuringDecoding: boolean;
  public deckToPresent;

  constructor(private cardsService: CardsService) {
    this.loading = true;
    this.errorLoadCards = false;
    this.errorDuringDecoding = false;
  }

  ngOnInit() {
    this.cardsService.getCards().subscribe(res => {
      this.cards = [...res];
      this.loading = false;
    }, () => this.errorLoadCards = true);
  }
  public checkString() {
    this.deckToPresent = null;
    const splitString = this.deckString.split('\n');
    this.deckString = splitString.find((line) => {
      return line[0] !== '#';
    });
    this.decode();
  }
  public decode() {
    let decoded: DeckDefinition;
    try {
      decoded = decode(this.deckString);
    } catch (e) {
      this.errorDuringDecoding = true;
    }
    if (decoded) {
      this.errorDuringDecoding = false;
      const cards = decoded.cards.map((card) => {
        return [this.cards.find((cardDescription) => {
          return cardDescription.dbfId === card[0];
        }), card[1]];
      }).sort((a, b) => {
        return a[0].cost - b[0].cost;
      });
      const hero = this.cards.find((card) => {
        return card.dbfId === decoded.heroes[0];
      });
      this.deckToPresent = {
        hero: hero.cardClass,
        card: cards
      };
    }
  }
}
