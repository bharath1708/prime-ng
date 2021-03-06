import { Component, OnInit } from '@angular/core';
import { Car } from '../../components/domain/car';
import { CarService } from '../../service/carservice';
import { SelectItem } from 'primeng/api';
import { FilterUtils } from '../../../components/utils/filterutils';

@Component({
    templateUrl: './tablefilterdemo.html'
})
export class TableFilterDemo implements OnInit {

    cars: Car[];

    cols: any[];

    brands: SelectItem[];

    colors: SelectItem[];

    yearFilter: number;

    yearTimeout: any;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        // this.brands = [
        //     { label: 'All Brands', value: null },
        //     { label: 'Audi', value: 'Audi' },
        //     { label: 'BMW', value: 'BMW' },
        //     { label: 'Fiat', value: 'Fiat' },
        //     { label: 'Honda', value: 'Honda' },
        //     { label: 'Jaguar', value: 'Jaguar' },
        //     { label: 'Mercedes', value: 'Mercedes' },
        //     { label: 'Renault', value: 'Renault' },
        //     { label: 'VW', value: 'VW' },
        //     { label: 'Volvo', value: 'Volvo' }
        // ];

        // this.colors = [
        //     { label: 'White', value: ['White','Green'] },
        //     { label: 'Green', value:  ['Silver','Green'] },
        //     { label: 'Silver', value: ['Silver','Black'] },
        //     { label: 'Black', value: ['Red','Black']},
        //     { label: 'Red', value: ['Red','Maroon']},
        //     { label: 'Maroon', value:['Brown','Maroon'] },
        //     { label: 'Brown', value: ['Orange','Maroon']  },
        //     { label: 'Orange', value: ['Blue','Maroon']  },
        //     { label: 'Blue', value: 'Blue' }
        // ];

        this.cols = [
            { field: 'vin', header: 'Vin'},
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' },
            { field: 'price', header: 'Price' }
        ];

        FilterUtils['custom'] = (value, filter): boolean => {
            if (filter === undefined || filter === null || filter.trim() === '') {
                return true;
            }
    
            if (value === undefined || value === null) {
                return false;
            }
            
            return parseInt(filter) > value;
        }
    }

    onYearChange(event, dt) {
        if (this.yearTimeout) {
            clearTimeout(this.yearTimeout);
        }

        this.yearTimeout = setTimeout(() => {
            dt.filter(event.value, 'year', 'gt');
        }, 250);
    }
}