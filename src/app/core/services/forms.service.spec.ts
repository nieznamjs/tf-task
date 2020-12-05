import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormsService } from './forms.service';

describe('FormsService', () => {
  let service: FormsService;
  let formGroup: FormGroup;
  let control: AbstractControl | null;
  const mockUsername = 'testUser';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FormsService ],
    });

    service = TestBed.inject(FormsService);
    formGroup = new FormGroup({
      username: new FormControl(mockUsername, Validators.required),
    });
    control = formGroup.get('username');
  });

  describe('hasError()', () => {
    it('should return `false` if field is not touched or dirty', () => {
      expect(formGroup.get('username')?.hasError('required')).toBe(false);
    });

    it('should return `false` if field is touched or dirty and has no error', () => {
      control?.markAsTouched();

      expect((control?.touched || control?.dirty) && control.hasError('required')).toBe(false);

      control?.markAsUntouched();
      control?.markAsDirty();
      expect((control?.touched || control?.dirty) && control.hasError('required')).toBe(false);
    });

    it('should return `true` if field is touched or dirty and has error', () => {
      control?.markAsTouched();
      control?.setErrors({ required: true });

      expect((control?.touched || control?.dirty) && control.hasError('required')).toBe(true);
    });
  });
});
