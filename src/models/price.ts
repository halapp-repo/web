import moment from 'moment';

export class Price {
  ProductId!: string;
  Price!: number;
  Unit!: string;
  TS!: string;
  isSameAsSelectedDate(date: string): boolean {
    return moment(this.TS).isSame(new Date(date), 'day');
  }
}
