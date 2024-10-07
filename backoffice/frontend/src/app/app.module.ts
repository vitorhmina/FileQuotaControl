import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {ViewModule} from './view/view.module';
import {NgxPermissionsModule} from 'ngx-permissions';
import {FormsModule} from '@angular/forms';
import {CommonComponent} from './components/common/common.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CommonComponent
  ],
  imports: [
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    BrowserModule,
    ViewModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
