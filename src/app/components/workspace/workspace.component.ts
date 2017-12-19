import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})

export class WorkspaceComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  getTemplate() {
    ipcRenderer.send('readTemplate');
  }
}
