import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import moment = require('moment');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  form: FormGroup;
  candidateData = {
    date_format: 'YYYY',
  };

  startView: any;

  dFormats = ['DD', 'MM', 'YYYY', 'DD/MM/YYYY', 'MM/DD/YYYY'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if(this.candidateData.date_format === 'MM'){
      this.startView = 'year';
    } else if(this.candidateData.date_format === 'YYYY'){
      this.startView = 'multi-year';
    }
  }

  initForm(){
    this.form = this.fb.group({
      format1: new FormControl(null),
    });
  }

  setMonth(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue: any = moment();
    if (this.candidateData.date_format === 'MM') {
      ctrlValue.year(normalizedMonthAndYear.year());
      ctrlValue.month(normalizedMonthAndYear.month());
      this.form.get('format1').setValue(ctrlValue);
      datepicker.close();
      console.log(this.form.value);
    }
  }

  setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue: any = moment();
    if (this.candidateData.date_format === 'YYYY') {
      ctrlValue.year(normalizedMonthAndYear.year());
      ctrlValue.month(normalizedMonthAndYear.month());
      this.form.get('format1').setValue(ctrlValue);
      datepicker.close();
      console.log(normalizedMonthAndYear);
    }
  }

  changeFormat(event){
    this.candidateData.date_format = event.value;
    if(this.candidateData.date_format === 'YYYY'){
      this.startView = 'multi-year';
    } else if(this.candidateData.date_format === 'MM'){
      this.startView = 'year';
    } else if(this.candidateData.date_format === 'DD'){
      this.startView = 'month';
    } else{
      this.startView = 'multi-year';
    }
  }
}
