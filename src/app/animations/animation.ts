import { trigger, transition, style, animate, AnimationTriggerMetadata } from '@angular/animations';

export function disappear(
  duration: number = 300, translation: number = 0, direction: string = 'Y', name: string = 'disappear'
  ): AnimationTriggerMetadata {
  return trigger(name, [
    transition('* => void', [
      animate(`${duration}ms ease`),
      style({ opacity: 0, transform: `translate${direction}(${translation}px)` }),
    ]),
  ]);
}
