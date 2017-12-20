import { Component, OnInit } from '@angular/core';
// import { Promise } from 'q';
const { ipcRenderer } = window.require('electron');

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

    ipcRenderer.on('getTemplate', (event, files) => {
      console.log(files);
    });
  }
}
