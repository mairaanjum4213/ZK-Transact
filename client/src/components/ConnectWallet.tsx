import "../css/Loader.css";
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import { Toaster, toast } from 'react-hot-toast';
const ConnectWallet: React.FC = () => {
  const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const handleWalletConnect = async (connector: Connector) => {
    const { chain } = await connectAsync({ connector });
    if (chain.unsupported) {
      toast.error("Please connect with sepolia");
      disconnect();
    }
  }
  const handleDisconnect = () => {
    disconnect();
  }
  return (
    <>
      {!isConnected && connectors.map(connector => {
        const { id } = connector;
        return (
          <button className="text-white rounded-full  px-4 py-2" disabled={!connector.ready} key={id} onClick={() => handleWalletConnect(connector)}
            style={{
              backgroundImage: 'linear-gradient(to right, rgb(255, 123, 222) 0%, rgb(226, 59, 185) 51%, rgb(226, 59, 185) 100%)'
            }}>
            Connect Wallet
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>)
      })}
      {isConnected && <button className="text-white rounded-full px-4 py-2" onClick={handleDisconnect}
        style={{
          backgroundImage: 'linear-gradient(to right, #6bb3a7 0%, #269e88 51%, #269e88 100%)'
        }}
      >
        Disconnect Wallet  </button>}
    </>
  );
};
export default ConnectWallet;
