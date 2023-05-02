import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ClientServiceService } from './../app/services/client-service.service';

@Component({
  selector: 'app-pages',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class PagesComponent implements OnInit {




  constructor(private ClientServiceService: ClientServiceService) {
  }

  ngOnInit(): void {
  }

}
