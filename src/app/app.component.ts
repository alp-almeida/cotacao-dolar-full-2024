import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cotacao } from './cotacao';
import { CotacaoDolarService } from './cotacaodolar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cotacaoAtual = new Cotacao(0,'','');
  cotacaoPorPeriodoLista: Cotacao[] = [];
  
  public dataInicial: Date | undefined;
  public dataFinal = new Date().toLocaleDateString();
  // dataFinal: Date = new Date();

  constructor( private cotacaoDolarService: CotacaoDolarService, private dateFormat: DatePipe) {
    
  }

  public getDataAtual(){
    return new Date();
  }


  public formatDate(strDate: string) :String {
    
    return Date.parse(strDate).toLocaleString();
  }


  public getCotacaoPorPeriodo(dataInicialString: string,dataFinalString: string): void {
    
    this.cotacaoPorPeriodoLista = [];
    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';

    const dtnow = Date.now();

     if (dataInicial && dataFinal) {
      if( dtnow<Date.parse(dataInicial) || dtnow < Date.parse(dataFinal)){
        window.alert('Nenhuma das datas pode ser maior que a data atual.')
      }else if(dataInicial > dataFinal){
        window.alert('Data inicial deve ser menor que a data final')
      } else{
        this.cotacaoDolarService.getCotacaoPorPeriodoFront(dataInicial, dataFinal)
            .subscribe(cotacoes => { this.cotacaoPorPeriodoLista = cotacoes;})
      }
    } else {
      //ALERTA DE ERRO POÍS DATA INICIAL E FINAL SÃO OBRIGATÓRIAS
      window.alert('Data inicial e data final são obrigatórias')
    }
  }


  public getCotacaoMenorPorPeriodoFront(dataInicialString: string,dataFinalString: string): void {
    
    this.cotacaoPorPeriodoLista = [];
    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';

    const dtnow = Date.now();

     if (dataInicial && dataFinal) {
      if( dtnow<Date.parse(dataInicial) || dtnow < Date.parse(dataFinal)){
        window.alert('Nenhuma das datas pode ser maior que a data atual.')
      }else if(dataInicial > dataFinal){
        window.alert('Data inicial deve ser menor que a data final')
      } else{
        this.cotacaoDolarService.getCotacaoMenorPorPeriodoFront(dataInicial, dataFinal)
            .subscribe(cotacoes => { this.cotacaoPorPeriodoLista = cotacoes;})
      }
    } else {
      //ALERTA DE ERRO POÍS DATA INICIAL E FINAL SÃO OBRIGATÓRIAS
      window.alert('Data inicial e data final são obrigatórias')
    }
  }

  ngOnInit() {
    this.cotacaoDolarService.getCotacaoAtual()
    .subscribe(cotacao => {this.cotacaoAtual = cotacao;})
  }
}
