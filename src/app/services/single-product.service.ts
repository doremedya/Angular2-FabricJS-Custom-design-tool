import {Injectable} from '@angular/core';

@Injectable()
export class SingleProductService {
  
  public item: any;
  constructor() {
    this.item = {
      frontImage: "",
      frontState: [],
      backImage: "",
      backState: []
    }
  }

  setValue(key, value) {
     this.item[key] = value
  }

  getValue() {
    return this.item
  }

}
