import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  public hasError(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);

    return !!((control?.touched || control?.dirty) && control.invalid);
  }
}
