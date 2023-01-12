import { Component, OnInit } from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
