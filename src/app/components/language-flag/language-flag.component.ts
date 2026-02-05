import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-language-flag',
  templateUrl: './language-flag.component.html',
  styleUrl: './language-flag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageFlagComponent {
  /** Locale code: 'en' | 'th' | 'zh' | 'ja' */
  readonly code = input.required<string>();
}
