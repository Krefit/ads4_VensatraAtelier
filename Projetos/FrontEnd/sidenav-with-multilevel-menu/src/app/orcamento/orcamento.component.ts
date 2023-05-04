import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupens',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class CoupensComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  listarOrcamento(){
    this.httpClient.get('http://localhost:8080/orcamento').subscribe((r:any)=> {console.log(r)});
  }


  ngOnInit(): void {
    this.listarOrcamento();
  }

}
