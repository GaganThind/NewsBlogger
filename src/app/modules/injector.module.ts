import { NgModule } from '@angular/core';
import { Injector } from '@angular/core';

export let InjectorInstance: Injector;

/**
 * This class provides the basic injector functionality.
 */
@NgModule({
  declarations: [],
  imports: []
})
export class InjectorModule { 
  
    constructor(private injector: Injector) {
        InjectorInstance = this.injector;
    }

}
