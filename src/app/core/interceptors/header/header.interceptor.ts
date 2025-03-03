import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('userToken') !== null) {
    
  const  myToken = localStorage.getItem('userToken');
  req = req.clone({
  setHeaders:{
  token : myToken!
  }
    })
  }
  return next(req); 
};
