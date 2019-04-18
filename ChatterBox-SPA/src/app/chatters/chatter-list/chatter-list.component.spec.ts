/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChatterListComponent } from './chatter-list.component';

describe('ChatterListComponent', () => {
  let component: ChatterListComponent;
  let fixture: ComponentFixture<ChatterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
