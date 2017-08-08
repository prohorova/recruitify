import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MdToolbarModule, MdButtonModule, MdMenuModule, MdInputModule, MdDialogModule,
  MdIconModule, MdSidenavModule, MdProgressBarModule, MdCardModule, MdRadioModule, MdSliderModule } from '@angular/material';

import { DialogComponent } from './dialog/dialog.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MdDialogModule,
    MdToolbarModule,
    MdMenuModule,
    MdButtonModule,
    MdIconModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,

    MdButtonModule,
    MdInputModule,
    MdDialogModule,
    MdSidenavModule,
    MdCardModule,
    MdRadioModule,
    MdSliderModule,
    MdIconModule,

    MdProgressBarModule,

    DialogComponent,
    NavComponent
  ],
  declarations: [
    DialogComponent,
    NavComponent
  ],
  entryComponents: [ DialogComponent ]
})

export class SharedModule {
}
