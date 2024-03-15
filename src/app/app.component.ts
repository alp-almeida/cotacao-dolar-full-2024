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

  constructor( private cotacaoDolarService: CotacaoDolarService, private dateFormat: DatePipe) {}

  public formatDate(strDate: string|Date) :String {
    if(typeof(strDate) =='string'){
      var output = this.dateFormat.transform(Date.parse(strDate), "dd/MMM/yyyy") || ''
      if(output.length == 0){
        output = this.dateFormat.transform(Date.parse(strDate), "MM/dd/yyyy") || ''
      }
      return output
    } else {
      return strDate.toLocaleString();
    }
    
  }


  public getValidacaoPreenchimento(dataInicial:string, dataFinal:string) :boolean{
    const dtnow = Date.now();

     if (!dataInicial && !dataFinal) {
      //ALERTA DE ERRO POÍS DATA INICIAL E FINAL SÃO OBRIGATÓRIAS
      window.alert('Data inicial e data final são obrigatórias')
      return false;
    } else if( dtnow<Date.parse(dataInicial) || dtnow < Date.parse(dataFinal)){
      window.alert('Nenhuma das datas pode ser maior que a data atual.')
      return false;
    }else if(dataInicial > dataFinal){
      window.alert('Data inicial deve ser menor que a data final')
      return false;
    } else {
      return true;
    }
  }



  public getCotacaoPorPeriodo(dataInicialString: string,dataFinalString: string): void {
    this.cotacaoPorPeriodoLista = [];
    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';
    if(this.getValidacaoPreenchimento(dataInicial,dataFinal)){
      this.cotacaoDolarService.getCotacaoPorPeriodoFront(dataInicial, dataFinal)
            .subscribe(cotacoes => { this.cotacaoPorPeriodoLista = cotacoes;})
    }
  }


  public getCotacaoMenorPorPeriodoFront(dataInicialString: string,dataFinalString: string): void {
    this.cotacaoPorPeriodoLista = [];
    console.log(dataInicialString,dataFinalString)
    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';
    if(this.getValidacaoPreenchimento(dataInicial,dataFinal)){
      this.cotacaoDolarService.getCotacaoMenorPorPeriodoFront(dataInicial, dataFinal)
            .subscribe(cotacoes => { this.cotacaoPorPeriodoLista = cotacoes;})
    }
  }

  ngOnInit() {
    this.cotacaoDolarService.getCotacaoAtual()
    .subscribe(cotacao => {this.cotacaoAtual = cotacao;})
  }
  
}
