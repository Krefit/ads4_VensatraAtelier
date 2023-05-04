import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  listarFornecedores(){
    this.httpClient.get('http://localhost:8080/fornecedores').subscribe((r:any) => {console.log(r)});
  }

  ngOnInit(): void {
    this.listarFornecedores();
  }

}
