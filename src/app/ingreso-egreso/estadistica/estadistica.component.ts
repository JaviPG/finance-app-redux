import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { ChartData } from 'chart.js';
import { AppStateWithItem } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  itemSubs: Subscription;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  constructor(private store: Store<AppStateWithItem>) {}

  ngOnInit(): void {
    this.itemSubs = this.store
      .select('items')
      .subscribe(({ items }) => this.generarStats(items));
  }

  ngOnDestroy(): void {
    this.itemSubs?.unsubscribe();
  }

  resetStats() {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
  }

  generarStats(items: IngresoEgreso[]) {
    this.resetStats();
    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIngresos += item.quantity;
        this.ingresos++;
      } else {
        this.totalEgresos += item.quantity;
        this.egresos++;
      }
    }

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data:[this.totalIngresos, this.totalEgresos] }],
    };

  }
}
