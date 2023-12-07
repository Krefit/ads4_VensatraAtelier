import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthorizationGuard} from './guard/authorization.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./page/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'item-details',
    loadChildren: () => import('./item-details/item-details.module').then( m => m.ItemDetailsPageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'my-cart',
    loadChildren: () => import('./my-cart/my-cart.module').then( m => m.MyCartPageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then( m => m.MyOrdersPageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'confirm',
    loadChildren: () => import('./confirm/confirm.module').then( m => m.ConfirmPageModule),
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'two-factory-auth',
    loadChildren: () => import('./page/two-factory-auth/two-factory-auth.module').then( m => m.TwoFactoryAuthPageModule)
  },  {
    path: 'cart-icon',
    loadChildren: () => import('./cart-icon/cart-icon.module').then( m => m.CartIconPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
