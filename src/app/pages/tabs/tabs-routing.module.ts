import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        loadChildren: () => import('../tab1-scan/scan.module').then(m => m.ScanPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('../tab2-historial/historial.module').then(m => m.HistorialPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/scan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/scan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
