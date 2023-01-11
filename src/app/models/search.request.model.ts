import { SearchCriteria } from './search.crtiteria.model';
export class SearchRequest {
  private page: number | undefined;
  private offSet: number | undefined;
  private size: number | undefined;
  private sortField: string | undefined;
  private sortOrder: string | undefined;
  private filters: SearchCriteria[];

  constructor() {}

  get _page(): number | undefined {
    return this.page;
  }

  set _page(value: number | undefined) {
    this.page = value;
  }

  get _offSet(): number | undefined {
    return this.offSet;
  }

  set _offSet(value: number | undefined) {
    this.offSet = value;
  }

  get _size(): number | undefined {
    return this.size;
  }

  set _size(value: number | undefined) {
    this.size = value;
  }

  get _sortField(): string | undefined {
    return this.sortField;
  }

  set _sortField(value: string | undefined) {
    this.sortField = value;
  }

  get _sortOrder(): string | undefined {
    return this.sortOrder;
  }

  set _sortOrder(value: string | undefined) {
    this.sortOrder = value;
  }

  get _filters(): SearchCriteria[] {
    return this.filters;
  }

  set _filters(value: SearchCriteria[]) {
    this.filters = value;
  }
}
