import { Pipe, PipeTransform } from '@angular/core';

/// ShortenPipe truncates a string to a specified length and appends '...' if it exceeds that length.
/// It is useful for displaying previews of longer text content in a concise manner.
@Pipe({
  name: 'shorten',
  standalone:false
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
