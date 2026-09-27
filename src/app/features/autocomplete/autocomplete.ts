import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";

interface Car {
  id: string;
  make: string;
  model: string;
  price?: number;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ReactiveFormsModule]
})
export class AutocompleteComponent {
  private cars: Car[] = [
    { id: 'mockId1', make: 'Toyota', model: 'Corolla', price: 1000 },
    { id: 'mockId2', make: 'Suzuki', model: 'Swift', price: 2000 },
    { id: 'mockId3', make: 'Tata', model: 'Punch', price: 1500 },
    { id: 'mockId4', make: 'BMW', model: 'M3', price: 5000 },
    { id: 'mockId5', make: 'Toyota', model: 'Camry', price: 1300 }
  ];

  public filteredCars$: Observable<Car[]>

  public searchControl = new FormControl('');

  public displayDropdown = signal(false);

  constructor() {
    this.filteredCars$ = this.searchControl.valueChanges.pipe(
      startWith(null),
      map((searchText: string | null) => {
        return !!searchText
          ? this.cars.filter(car => this.carSearchMatcher(car, searchText))
          : this.cars;
      })
    );
  }

  private carSearchMatcher(car: Car, searchText: string): boolean {
    return `${car.make.toLowerCase()} ${car.model.toLowerCase()}`.includes(searchText.toLowerCase());
  }

  focused() {
    this.displayDropdown.set(true)
  }

  blur() {
    this.displayDropdown.set(false)
  }
}
