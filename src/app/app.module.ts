import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { EscolhaPage } from '../pages/escolha/escolha';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //EscolhaPage -> Será carregado por lazy loading
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [ // Componentes que queremos navegar
    MyApp,
    HomePage,
    //EscolhaPage -> Será carregado por lazy loading
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServiceProvider // adicionado automaticamente pelo ionic cli
  ]
})
export class AppModule {}
