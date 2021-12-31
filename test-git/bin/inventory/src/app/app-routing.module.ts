import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';

import { LoginComponent } from './components/login/login.component';
import { TestDashComponent } from './components/test-dash/test-dash.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';

import { AuthGuard } from './app-routing.guard';
import { AuthService } from './services/auth.service';
import { Role } from './model/role';
import { TestMultiFieldComponent } from './test-multi-field/test-multi-field.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestMultiFieldComponent },
  { path : '', component : LoginComponent },
  { path: 'admin', canLoad: [AuthGuard], canActivate: [AuthGuard],
      data: {
      roles: [Role.Admin,]
    },
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'editor', canLoad: [AuthGuard], canActivate: [AuthGuard],
      data: {
      roles: [Role.Editor,]
    },
    loadChildren: () => import('./components/editor/editor.module').then(m => m.EditorModule)
  },
  { 
    path : 'home',
    children: [
      { path: '', component: TestDashComponent },
      { path: 'form', component: TestFormComponent },
      { path: 'products', component: TestTableComponent },
      { path: 'update/:id', component: UpdateProductComponent },
      { path: 'add', component: AddProductComponent }
    ]
  },
  { path: '**', component: LoginComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
