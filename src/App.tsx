import './App.css';
import Cards from './components/cards';
import Header from './components/header';
import Arweave from 'arweave';
import Account from 'arweave-account';

export const arweave = Arweave.init({});
export const account = new Account({
    cacheIsActivated: true,
    cacheSize: 100,
    cacheTime: 3600000, // 3600000ms => 1 hour cache duration
});
function App() {
    return (
        <div className=" text-white">
            <Header />
            <div className="h-px w-full bg-[#1e191d] mt-5" />
            <Cards />
        </div>
    );
}

export default App;
