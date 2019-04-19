import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ChatterEditComponent } from '../chatters/chatter-edit/chatter-edit.component';

@Injectable()

export class PreventUnsavedChanges implements CanDeactivate<ChatterEditComponent>{
        canDeactivate(component: ChatterEditComponent){
            if(component.editForm.dirty){
                return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
            }
            return true;
        }
}