import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherNotePage } from './teacher-note.page';
import { RoleGuardService as RoleGuard } from '../../guards/role-guard.service'

const routes: Routes = [
  {
    path: '',
    component: TeacherNotePage,
    canActivate: [RoleGuard],
    data: {
      expectedRoletea: "teacher",
    },
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/teacher-note-create/teacher-note-create.module').then( m => m.TeacherNoteCreatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoletea: "teacher",
    },
  },
  {
    path: 'view/:id',
    loadChildren: () => import('./pages/teacher-note-view/teacher-note-view.module').then( m => m.TeacherNoteViewPageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoletea: "teacher",
    },
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./pages/teacher-note-update/teacher-note-update.module').then( m => m.TeacherNoteUpdatePageModule),
    canActivate: [RoleGuard],
    data: {
      expectedRoletea: "teacher",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherNotePageRoutingModule {}
