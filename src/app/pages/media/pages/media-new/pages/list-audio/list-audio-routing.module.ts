import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAudioPage } from './list-audio.page';

const routes: Routes = [
  {
    path: '',
    component: ListAudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAudioPageRoutingModule {}
