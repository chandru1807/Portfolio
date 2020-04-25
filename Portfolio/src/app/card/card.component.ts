import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnChanges {

  @Input() imgInput;
  @Input() titleInput;
  @Input() bodyInput;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
