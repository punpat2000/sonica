import { Pipe, PipeTransform } from '@angular/core';

/** Returns first letters of first two words, or first two characters of the string. */
@Pipe({ name: 'initials', standalone: true })
export class InitialsPipe implements PipeTransform {
  transform(name: string | null | undefined): string {
    if (name == null || name === '') {
      return '';
    }
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}
