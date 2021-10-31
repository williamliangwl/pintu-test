import { PriceDirection } from "../types";

export function animatePriceDirection(direction: PriceDirection) {
  switch (direction) {
    case 'up':
      return 'animate-flash-green';
    case 'down':
      return 'animate-flash-red';
    default:
      return '';
  }
}