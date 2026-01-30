import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { INK_SERIES_CATALOGUE } from './ink-series.model';

@Component({
  selector: 'app-inks',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './inks.component.html',
  styleUrl: './inks.component.scss',
})
export class InksComponent {
  readonly inkSeries = INK_SERIES_CATALOGUE;
}
