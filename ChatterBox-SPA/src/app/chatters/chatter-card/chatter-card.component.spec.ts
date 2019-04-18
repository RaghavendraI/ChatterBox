/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChatterCardComponent } from './chatter-card.component';

describe('ChatterCardComponent', () => {
  let component: ChatterCardComponent;
  let fixture: ComponentFixture<ChatterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
