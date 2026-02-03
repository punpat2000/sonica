import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [NgOptimizedImage],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {

}
