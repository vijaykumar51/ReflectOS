import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";

import { CardComponent } from "./components/card-element/card.component";

@NgModule({
	declarations: [CardComponent],
	imports: [BrowserModule],
	providers: [],
	entryComponents: [CardComponent]
})
export class AppModule {
	constructor(private injector: Injector) {}

	ngDoBootstrap() {
		const el = createCustomElement(CardComponent, {
			injector: this.injector
		});
		customElements.define("card-element", el);
	}
}
