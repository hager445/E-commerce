import { HttpInterceptorFn } from '@angular/common/http';
import Aos from 'aos';
import { finalize } from 'rxjs';

export const animationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    finalize(()=>{
     Aos.refresh()
    })
  );
};
