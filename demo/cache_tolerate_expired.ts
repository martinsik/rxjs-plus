/**
 * Demo featuring the `cache()` operator with in `CacheMode.TolerateExpired` mode.
 *
 * In this demo each subscriber receives one or two items:
 *  1. The cached item
 *  2. Another item if the currently cached item was stale
 */
import { defer, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { cache, CacheMode } from '../src/operators';

let counter = 0;

const source = defer(() => {
  console.log('defer');
  return of(counter++).pipe(
    delay(100),
  );
}).pipe(
  cache(1000, CacheMode.TolerateExpired),
);

setTimeout(() => source.subscribe(val => console.log('sub1', val)), 0);
setTimeout(() => source.subscribe(val => console.log('sub2', val)), 200);
setTimeout(() => source.subscribe(val => console.log('sub3', val)), 1200);
setTimeout(() => source.subscribe(val => console.log('sub4', val)), 1500);
setTimeout(() => source.subscribe(val => console.log('sub5', val)), 3000);

/**
 * Notice that some subscribers received first the cached item and then another one
 * when the cache was refreshed.
 *
 * Expected output:
defer
sub1 0
sub2 0
sub3 0
defer
sub3 1
sub4 1
sub5 1
defer
sub5 2
*/