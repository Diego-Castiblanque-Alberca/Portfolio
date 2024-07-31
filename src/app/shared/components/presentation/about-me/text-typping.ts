import { ElementRef } from '@angular/core';

export interface TextTypping {
  element: ElementRef,
  isTypping: boolean,
  isWaitting: boolean,
  text: string,
}
