import { AuthLayoutComponent } from "./layout/auth/auth.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { TokenInterceptor } from "./services/token.interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoginPage } from "./pages/auth/pages/login/login.page";
import { JwtModule } from "@auth0/angular-jwt";
import { PdfViewerModule } from "ng2-pdf-viewer";
// import { UploadFilePageModule } from './shared/modal/upload-file/upload-file.module';
import { SharedModule } from "./shared/shared.module";
import { UploadFilePageModule } from "./shared/modal/upload-file/upload-file.module";
import { UploadFilePage } from "./shared/modal/upload-file/upload-file.page";
import { UploadComponent } from "./shared/components/upload/upload.component";
// import { UploadFilePage } from './shared/modal/upload-file/upload-file.page';
import { IonicSelectableModule } from "ionic-selectable";
import { ContentLayoutComponent } from "./layout/content/content.component";
import { LayoutModule } from "./layout/layout.module";
import { NgxsModule } from "@ngxs/store";
import { appState, appStoredState } from "./app-state.models";
import { environment } from "src/environments/environment";

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [UploadComponent],
  imports: [
    // BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    PdfViewerModule,
    // UploadFilePage,
    IonicSelectableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageLoader,
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    NgxsModule.forRoot(appState, { developmentMode: !environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
