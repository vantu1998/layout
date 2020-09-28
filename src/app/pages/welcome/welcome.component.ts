import { SEARCH_LIST } from './config';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  searchForm: FormArray;
  constructor(private fb: FormBuilder) {
    this.searchForm = fb.array([]);
    this.filterList();
  }
  fieldList = [];
  searchList = SEARCH_LIST;

  addSearchControl(): void {
    this.fieldList.push(SEARCH_LIST);
    this.searchForm.push(this.createControl());
  }

  filterList(): void {
    this.searchForm.valueChanges.pipe(
      map(data => data.map(item => item.field))
    ).subscribe(data => {
      // console.log(data)
      this.fieldList.map((list, i) => {
        const index = this.findIndex(data[i]);
        const l = list.map((item) => {
          console.log(data.indexOf(item.field));
          if (data.indexOf(item.field) !== -1) {
            item.selected = true;
          }
          return item;
        });
        console.log(l);
        if(index !== -1){
          l[index].selected = false;
        }
        return l;
      });
    });
  }
  createControl(): FormGroup {
    return this.fb.group({
      field: [''],
      input: [''],
      type: ['']
    });
  }

  findIndex(label: string): number {
    let index = -1;
    this.searchList.forEach((item, i) => {
      if (item.field === label) {
        index = i;
      }
    });
    console.log(index);
    return index;
  }
  remove(id): void {
    this.searchForm.removeAt(id);
  }
  ngOnInit(): void {

  }

}
