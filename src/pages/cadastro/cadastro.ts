import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../models/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../models/agendamento';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public carro: Carro;
  public preco: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController) {

    this.carro = this.navParams.get('carroSelecionado');
    this.preco = this.navParams.get('precoTotal');

  }

  agendar() {
    if (!this.nome || !this.endereco || !this.email) {
      this._alertCtrl.create({
        title: "Atenção",
        subTitle: "Preencha todos os campos.",
        buttons: [{
          text: "Ok"
        }]
      }).present();

      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.preco
    };

    // Precisamos colocar a criação do alerta aqui para que o alerta seja recriado
    // sempre que realizarmos um agendamento, pois ao clicar em Ok o alerta é destruído
    // e o ionic barra o acesso a um elemento que foi destruído
    this._alerta = this._alertCtrl.create({
      buttons: [{
        text: "Ok",
        handler: () => {
          // Ao invés de navegarmos e adicionarmos HomePage na pilha,
          // Navegamos para HomePage e setamos ela como raíz , pois caso
          // fosse utilizado o push o backbutton seria mostrado e o usuário
          // poderia voltar da tela de listagem para tela de cadastro
          this.navCtrl.setRoot(HomePage);
        }
      }]
    });

    let alertContent = { title: "", subtitle: "" };

    this._agendamentoService.agenda(agendamento)
      // deve ser habilitado no rxjs (no app module ou no inicio deste arquivo)
      //  pois por padrão deve ser desabilitado
      // sempre executa independente de erro ou sucesso
      .finally(
        () => {
          this._alerta.setTitle(alertContent.title).setSubTitle(alertContent.subtitle);
          this._alerta.present();
        })
      .subscribe(
        () => {
          alertContent.title = "Sucesso";
          alertContent.subtitle = "Agendamento realizado com sucesso.";
        },
        () => {
          alertContent.title = "Erro";
          alertContent.subtitle = "Erro ao realizar agendamento. Tente novamente mais tarde.";
        })

  }
}
