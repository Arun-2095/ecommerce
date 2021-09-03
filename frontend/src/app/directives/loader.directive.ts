import { Component, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})

export class LoaderDirective {
  public preLoader: HTMLDivElement = document.createElement("div");
  
  
  constructor(private el: ElementRef) {
  this.preLoader.innerHTML = `<p> je; </p`;
  this.preLoader.id="loader"
  this.preLoader.style["display"] = "flex";
  this.preLoader.style["alignItems"] = "center";
  this.preLoader.style["justifyContent"] = "center";
  this.preLoader.style["height"] = "100vh";
  this.preLoader.style["position"] = "fixed";
  this.preLoader.style["left"] = "0";
  this.preLoader.style["top"] = "0";
  this.preLoader.style["transition"] = "opacity 0.3s linear";
  this.preLoader.style["width"] = "100%";
  this.preLoader.style["zIndex"] = "99";
  }

  @Input()set appLoader(condition: boolean) {
    console.log(condition, "loader")
    if(condition){
 
      (this.el.nativeElement as HTMLElement).appendChild(this.preLoader)
    }else{
      console.log(condition, "loader")
      const loader: HTMLElement | null = document.getElementById("loader");
      if(loader){
        (this.el.nativeElement as HTMLElement).removeChild(loader)
      }
    }
  }

}
