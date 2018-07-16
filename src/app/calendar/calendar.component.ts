import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public monthDays: Array<Array<number>>;
  public weekDays: string [] = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ];
  public months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'];
  public years: number[];

  public selectedMonth: string;
  public selectedYear: number;

  constructor() {
    this.monthDays = new Array<Array <number>>();
    this.years = new Array<number>();
    const currentDate = new Date();
    this.selectedMonth = this.months[currentDate.getMonth()];
    this.selectedYear = currentDate.getFullYear();
    for (let i = 1970; i < currentDate.getFullYear() + 10; i++) {
      this.years.push(i);
    }
    this.setSelectedMonth(currentDate.getMonth());
  }

  ngOnInit() {
  }

  public setSelectedMonth(selectedMonthIndex: number) {
    const selectedDate = new Date(this.selectedYear, selectedMonthIndex, 1);
    const weekDay = selectedDate.getDay();

    this.monthDays.push(new Array<number>());
    let i = 0;
    let currentRow = 0;
    let currentDay = 1;

    this.setDaysPreviousMonth(currentRow, weekDay, selectedMonthIndex);
    for (i; i < 7; i++) {
      this.monthDays[currentRow].push(currentDay);
      currentDay ++;
    }
    currentRow ++;
    for (currentRow; currentRow < 4; currentRow++) {
      i = 0;
      this.monthDays.push(new Array<number>() );
      for (i; i <  7; i++ ) {
        this.monthDays[currentRow].push(currentDay);
        currentDay++;
      }
    }
    this.monthDays.push(new Array<number>() );

    let lastDayOfMonth: Date = new Date(this.selectedYear);
    if (selectedMonthIndex !== 11) {
      lastDayOfMonth = new Date(this.selectedYear, selectedMonthIndex + 1, 0);
    } else {
      lastDayOfMonth = new Date(this.selectedYear + 1, 1, 0);
    }
    i = 0;
    for (i; i <= lastDayOfMonth.getDay(); i++) {
      this.monthDays[currentRow].push(currentDay);
      currentDay++;
    }

    this.setDaysNextMonth(currentRow, lastDayOfMonth.getDay() , selectedMonthIndex);
  }

  public setDaysNextMonth(currentRow: number, weekDay: number, month: number) {
    let nextMonth: Date;
    if (month !== 11) {
      nextMonth = new Date(this.selectedYear, month + 1, 1);
    } else {
      nextMonth = new Date(this.selectedYear + 1, 0, 1);
    }

    for (let i = 1; i < 7 - weekDay ; i++) {
      this.monthDays[currentRow].push(i);
    }

  }

  public setDaysPreviousMonth(currentRow: number, weekDay: number, month: number) {
    let previousMonth: Date;
    if (month !== 0) {
      previousMonth = new Date(this.selectedYear, month - 1, 0);
    } else {
      previousMonth = new Date(this.selectedYear - 1, 12, 0);
    }

    for (let i = weekDay; i > 0; i--) {
      this.monthDays[currentRow].push(previousMonth.getDate() - i);
    }

  }

}
