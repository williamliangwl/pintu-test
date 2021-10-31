import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import { ListPage } from './pages/ListPage';
import { StateProvider } from './states/MyState';

const queryClient = new QueryClient();

function App() {
  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        <ListPage />
      </QueryClientProvider>
    </StateProvider>
  );
}

export default App;
