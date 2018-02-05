import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isIndex = false; // 标志是否是首页

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this
      .router
      .events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.route)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(({ isIndex }) => {
        this.isIndex = isIndex;
      });
  }
}
