import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> ProductsPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '100%' }) // ⬅️ الصفحة الجديدة تبدأ خارج الشاشة على اليمين
      ]),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '-100%' })) // ⬅️ الصفحة القديمة تخرج لليسار
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' })) // ⬅️ الصفحة الجديدة تدخل
        ])
      ])
    ])
  ]);
