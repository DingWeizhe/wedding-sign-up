import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const grow = trigger('grow', [
  transition(
    ':enter',
    [
      style({
        transform: 'scale(0.95) rotate({{rotate}}deg)',
        opacity: 0,
      }),
      animate('3s {{delay}}s ease-out'),
    ],
    { params: { rotate: 0, delay: 0 } }
  ),
  state(
    'initial',
    style({ transform: 'scale(1) rotate(0deg)', opacity: '{{opacity}}' }),
    { params: { opacity: 1 } }
  ),
  state(
    'exit',
    style({ transform: 'scale(1.1) rotate({{rotate}}deg)', opacity: 0 }),
    { params: { rotate: 0 } }
  ),
  transition('* => exit', [animate('1s ease-in')]),
]);
