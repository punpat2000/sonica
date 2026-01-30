import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getInkSeriesDetail, type InkSeriesDetail } from '../ink-series.model';

@Component({
  selector: 'app-ink-detail',
  imports: [RouterLink],
  templateUrl: './ink-detail.component.html',
  styleUrl: './ink-detail.component.scss',
})
export class InkDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected ink = signal<InkSeriesDetail | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      const detail = getInkSeriesDetail(slug);
      this.ink.set(detail);
      if (!detail) {
        this.router.navigate(['/products/inks']);
      }
    });
  }

  getColorNoteLabel(note: string): string {
    if (note === '¹') return $localize`May not be suitable for lightfast applications. Prolonged exposure to direct sunlight not recommended.`;
    if (note === '²') return $localize`Avoid using in color matches; these colors contain multiple pigments.`;
    if (note === '*') return $localize`Halogen free per the International Electrotechnical Commission standard IEC 61249-2-21, or may not be suitable for lightfast applications and is not recommended for prolonged exposure to direct sunlight.`;
    return note;
  }
}
