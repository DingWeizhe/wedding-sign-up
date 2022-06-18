import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInChild = trigger('fadeInChild', [
  transition(':increment,:enter', [
    query(
      '.row:enter',
      [
        style({
          opacity: 0,
          height: 0,
          marginTop: 0,
        }),
        stagger(10, [
          animate(
            '1s ease-out',
            style({
              opacity: 1,
              height: '*',
              marginTop: '*',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          opacity: 1,
        }),
        stagger(-300, [
          animate(
            '1s ease-in',
            style({
              opacity: 0,
              height: 0,
              marginTop: 0,
            })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
