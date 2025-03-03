
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { animation } from '@angular/animations';

// المسارات مع Lazy Loading
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // مسار الـ AuthLayout و الأطفال سيتم تحميلها lazily
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
      },
      {
        path: 'forgotPass',
        loadComponent: () => import('./pages/forgot-pass/forgot-pass.component').then(m => m.ForgotPassComponent),
      },
    ]
  },

  // مسار الـ BlankLayout و الأطفال سيتم تحميلها lazily
  {
    path: '',
    component: BlankLayoutComponent,canActivate:[authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        data :{animation : 'HomePage'}
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
        data :{animation : 'ProductsPage'}
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
      },
      {
        path: 'brands',
        loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
      },
      {
        path: 'categories/:id',
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
      },
      {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
      },
      {
        path: 'billingdetails/:id',
        loadComponent: () => import('./pages/billingdetails/billingdetails.component').then(m => m.BillingdetailsComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent),
      },
      {
        path: 'brand-products',
        loadComponent: () => import('./pages/brand-products/brand-products.component').then(m => m.BrandProductsComponent),
      },
      {
        path: 'allorders',
        loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent),
      },
    ]
  }
];

