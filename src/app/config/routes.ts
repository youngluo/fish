import { Routes } from '@angular/router';
import { IndexComponent } from '../pages/index/index.component';
import { TemplateComponent } from '../pages/template/template.component';

export const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    data: {
      isIndex: true
    }
  },
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
];
