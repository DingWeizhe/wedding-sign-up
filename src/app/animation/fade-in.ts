import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  state('initial', style({ marginTop: '*', opacity: 1 })),
  transition(
    ':enter',
    [style({ marginTop: 0, opacity: 0 }), animate('1s {{delay}}s ease-out')],
    { params: { delay: 0 } }
  ),
  transition(
    ':leave',
    [
      animate(
        '1s ease-out',
        style({
          transform: 'scale(0.95) translate(0, -30px)',
          opacity: 0,
        })
      ),
    ],
    { params: { delay: 0 } }
  ),
]);
