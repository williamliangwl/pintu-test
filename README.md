# Pintu Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Hosted
Hosted link: https://master.d3k86kfey4hi86.amplifyapp.com/

## Run this project
`yarn && yarn start`

## Features
- Fetch [Binance All Assets API](https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset)
- WebSocket to [Binance Ticker](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#all-market-mini-tickers-stream). It is updated every 3 seconds.
- Responsive design
- Simple unit tests
- Search based on code / name
- Filter by tag
- Pagination
- Automated deployment through AWS Amplify

## "Code" of Conduct
- Create and reuse components as much as possible, while still ensuring component's extensibility
- Use the "right" style on the "right" component, e.g. text styling is better to be put as part of component / element related to text.
- When adding a new dependency, consider its bundle size and the benefits it brings. For example, using [`react-lottie`](https://github.com/chenqingspring/react-lottie) doesn't suit this project as we have less animation needed. In this case, we can use GIF instead.

## Assumptions
- Price, 24H Change and Volume of `All Cryptos` tab are average of related cryptos from the `Spot Market`. Thus I made 2 tabs there because I think it makes more sense to be separated.
- Images of crypto assets are broken. It looks like blocked by the Binance's Cloudfront.
- To calculate price, it is multiplied by hardcoded exchange rate: [6172.5](https://github.com/williamliangwl/pintu-test/blob/master/src/constants.ts#L3)
- Tags in `Spot Market` and `All Cryptos` are ok-to-be-hardcoded because it is seldom changed.

## Improvement opportunities
If there were more time, I would:
- Add more tests, such as snapshot tests, integration tests
- Handling API error
- Add Storybook (having a hard time to integrate it with Tailwind. It is indeed possible to import the Tailwind through CDN though)
- Find out how to calculate the price and market cap properly
