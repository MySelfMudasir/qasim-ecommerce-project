import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPanel]',
  host: {
    class: 'border rounded-xl p-6',
    style: 'background-color: var(--app-surface); border-color: var(--app-border);'
  }
})
export class ViewPanel {

  constructor() { }

}
