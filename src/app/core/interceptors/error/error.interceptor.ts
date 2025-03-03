import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _ToastrService = inject(ToastrService);
//  it should return an observable  that means the request wont reach to the server till all operation all done 
// the response coming as observable ✔ This allows us to use RxJS operators to modify, transform, or handle errors before the response reaches the component.
// ✔ Once you subscribe, the Observable turns into a normal JavaScript object.
// ✔ You cannot use .pipe() on it anymore.
// next(req) ✔ It returns an Observable, meaning that the request is still asynchronous.
// =============================
// ✔ The .pipe() function allows us to process the response before sending it to the component.
// ✔ Inside .pipe(), we can use RxJS operators like catchError(), map(), or tap().
// throwError(), the error handling will stop inside the interceptor, and subscribe() in the component won't receive the error! 🚀


  return next(req).pipe(catchError((err)=>{
return throwError(()=>_ToastrService.error(err.message))
  }));
};
