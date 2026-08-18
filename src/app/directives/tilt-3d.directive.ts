import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt3D]',
  standalone: true,
})
export class Tilt3DDirective {
  @Input() maxTilt = 12; // max tilt rotation in degrees
  @Input() perspective = 1000; // perspective depth in px
  @Input() scale = 1.02; // hover scale factor

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease');
    this.renderer.setStyle(this.el.nativeElement, 'transform-style', 'preserve-3d');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -this.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.maxTilt;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(${this.perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${this.scale}, ${this.scale}, ${this.scale})`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
  }
}
