import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  isIndex: boolean;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
}
