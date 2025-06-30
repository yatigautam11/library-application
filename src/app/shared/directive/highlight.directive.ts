import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


// HighlightDirective adds a hover effect to elements by applying a box shadow and scaling the element slightly.
// It listens for mouse enter and leave events to apply and remove the styles.
@Directive({
  selector: '[appHighlight]',
  standalone:false
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0 0 10px rgba(0, 0, 0, 0.3)');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.02)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}
