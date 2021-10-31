import { QueryClient, QueryClientProvider } from 'react-query';
import { ListPage } from './pages/ListPage';
import { BinanceStateProvider } from './states/BinanceState';

const queryClient = new QueryClient();

function App() {
  return (
    <BinanceStateProvider>
      <QueryClientProvider client={queryClient}>
        <ListPage />
      </QueryClientProvider>
    </BinanceStateProvider>
  );
}

export default App;
