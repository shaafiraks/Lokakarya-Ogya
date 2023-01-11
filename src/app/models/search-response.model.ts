export class SearchResponse {
  private totalRows: number;
  private results: any;

  get _totalRows(): number {
    console.log('get totalRows :', this.totalRows);
    return this.totalRows;
  }

  set _totalRows(value: number) {
    console.log('set totalRows :', value);
    this.totalRows = value;
  }

  get _results(): any {
    return this.results;
  }

  set _results(value: any) {
    this.results = value;
  }
}
