import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Hashids from 'hashids/esm/hashids';
import { firstValueFrom, map } from 'rxjs';
import { fadeIn } from '../animation/fade-in';
import { fadeInChild } from '../animation/fade-in-child';
import { grow } from '../animation/grow';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  animations: [grow, fadeIn, fadeInChild],
})
export class FormComponent implements AfterContentInit {
  public isLoading = true;
  public status = 1;
  public options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public name = new FormControl('', [Validators.required]);
  public gender = new FormControl<'MALE' | 'FEMALE' | ''>('', [
    Validators.required,
  ]);
  public attend = new FormControl(true, [Validators.required]);
  public address = new FormControl('', [Validators.required]);
  public count = new FormControl(1);
  public childSeat = new FormControl(0);
  public vegetarians = new FormControl(0);
  public letter = new FormControl(true);
  public blessing = new FormControl('', []);
  public weddingCake = new FormControl(true);
  public phone = new FormControl('');
  public email = new FormControl('');
  public ceremony = new FormControl(false);

  public form = new FormGroup<SignUpFormGroup>({
    name: this.name,
    gender: this.gender,
    phone: this.phone,
    email: this.email,
    attend: this.attend,
    count: this.count,
    child_seat: this.childSeat,
    vegetarians: this.vegetarians,
    letter: this.letter,
    blessing: this.blessing,
    address: this.address,
    wedding_cake: this.weddingCake,
    ceremony: this.ceremony,
  });

  public isSenior$ = this._activatedRoute.queryParams.pipe(
    map((params) => params['mode'] === 'senior')
  );

  public gender$ = this._activatedRoute.queryParams.pipe(
    map((params) => ((params['gender'] ?? '') + '').toUpperCase())
  );

  public constructor(
    private readonly _httpClient: HttpClient,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  public ngAfterContentInit(): void {
    if (localStorage.getItem('arrived') === null) {
      this._router.navigate(['landing'], { queryParamsHandling: 'merge' });
    }

    const form = localStorage.getItem('form');
    if (form) {
      const formData = JSON.parse(form);
      for (let key in formData) {
        const control = this.form.get(key);
        const value = formData[key];
        if (!control) return;
        control.setValue(value);
      }
    }

    this.form.valueChanges.subscribe((value) => {
      localStorage.setItem('form', JSON.stringify(value));
      this.status++;
    });

    this.attend.valueChanges.subscribe((attend) => {
      if (!attend) {
        this.ceremony.setValue(false);
      }
      this.form.removeControl('address');
    });

    this.gender$.subscribe((gender) => {
      switch (gender) {
        case 'MALE':
          this.gender.setValue('MALE');
          this.gender.markAsDirty();
          break;

        case 'FEMALE':
          this.gender.setValue('FEMALE');
          this.gender.markAsDirty();
          break;
      }
    });

    this.letter.valueChanges.subscribe((letter) => {
      if (letter) {
        this.form.setControl('address', this.address);
      } else {
        this.form.removeControl('address');
      }
    });
  }

  public async submit() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    if (this.form.disabled) {
      return;
    }

    const value = this.form.value;
    this.form.disable();

    try {
      const response = await firstValueFrom(
        this._httpClient.post<CreateWeddingSignUpResponse>(
          'https://directus.gosu.bar/2074/items/wedding',
          value
        )
      );

      const hashids = new Hashids('DING_SORA', 6, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

      this._router.navigate(['success'], {
        queryParams: { signUpId: hashids.encode(response.data.id) },
      });
      return;
    } catch {
    } finally {
      this.form.enable();
    }
  }
}

type CreateWeddingSignUpResponse = {
  data: {
    id: number;
  };
  public: true;
};

type SignUpFormGroup = {
  name: FormControl<string | null>;
  gender: FormControl<'' | 'MALE' | 'FEMALE' | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
  attend: FormControl<boolean | null>;
  count: FormControl<number | null>;
  child_seat: FormControl<number | null>;
  vegetarians: FormControl<number | null>;
  letter: FormControl<boolean | null>;
  address?: FormControl<string | null>;
  blessing: FormControl<string | null>;
  wedding_cake: FormControl<boolean | null>;
  ceremony: FormControl<boolean | null>;
};
