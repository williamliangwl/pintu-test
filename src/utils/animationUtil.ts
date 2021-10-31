import classNames from "classnames";
import { PriceDirection } from "../types";

export function animatePriceDirection(direction: PriceDirection) {
  return classNames({
    'animate-flash-green': direction === 'up',
    'animate-flash-red': direction === 'down'
  })
}