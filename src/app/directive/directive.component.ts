import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public showButton: boolean = true;
  public valueButton: string = 'Ocultar';
  public listaCurso: string[] = ['TypeScript', 'Java', 'C#', 'PHP', 'JavaScript']

  public setShowButton(){
    if(this.showButton){
      this.showButton = false;
      this.valueButton = 'Mostrar';
    }
    else {
      this.showButton = true;
      this.valueButton = 'Ocultar';
    }
  }
}
