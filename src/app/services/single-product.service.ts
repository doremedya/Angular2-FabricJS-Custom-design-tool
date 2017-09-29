import {Injectable} from '@angular/core';

@Injectable()
export class SingleProductService {
  
  public item: any;
  public layout: string = "horizontal";
  public size: string = "large";
  public selectedImage: any;

  constructor() {
    this.item = {
      frontImage: "",
      frontState: [],
      backImage: "",
      backState: []
    }

    this.selectedImage = {
      'front-builder': "",
      "back-builder": ""
    }
  }

  setValue(key, value) {
     this.item[key] = value
  }

  getValue() {
    localStorage.setItem('image', JSON.stringify(this.item))
    return this.item
  }

  setLayout(value) {
    this.layout = value
  }

  setSizePanel(value) {
    this.size = value
  }

  getLayout() {
    return this.layout
  }

  getSizePanel() {
    return this.size
  }

  setSelectedImage(key, value) {
    this.selectedImage[key] = value
  }

  getSelectedImage() {
    return this.selectedImage
  }

}
