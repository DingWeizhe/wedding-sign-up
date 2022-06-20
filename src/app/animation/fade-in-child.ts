import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInChild = trigger('fadeInChild', [
  transition(':enter', [
    query(
      '.row:enter',
      [
        style({ opacity: 0, marginTop: 0 }),
        stagger(10, [
          animate('1s ease-out', style({ opacity: 1, marginTop: '*' })),
        ]),
      ],
      { optional: true }
    ),
  ]),
  transition(':increment', [
    state('*', style({ transformOrigin: 'top center' })),
    query(
      '.row:enter',
      [
        style({
          opacity: 0,
          height: 0,
          marginTop: 0,
          transform: 'scale(.7)',
        }),
        stagger(10, [
          animate(
            '1s ease-out',
            style({
              opacity: 1,
              height: '*',
              marginTop: '*',
              transform: 'scale(1)',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ opacity: 1, transform: 'scale(1)' }),
        stagger(-300, [
          animate(
            '1s ease-in',
            style({
              opacity: 0,
              height: 0,
              marginTop: 0,
              transform: 'scale(.7)',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
