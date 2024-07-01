import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routes";
import { HttpClient } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        HttpClient
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
