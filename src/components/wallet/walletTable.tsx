type Props = {}
import { LockIcon } from "lucide-react"

    interface CoinHolding {
      name: string
      amount: string
    }
    
    const coinHoldings: CoinHolding[] = [
      { name: "BITCOIN", amount: "BTC 0.00256" },
      { name: "BITCOIN 1", amount: "BTC 0.00256" },
      { name: "BITCOIN 2", amount: "BTC 0.00256" },
      { name: "BITCOIN 3", amount: "BTC 0.00256" },
      { name: "BITCOIN 4", amount: "BTC 0.00256" },
    ]
const WalletTable = (props: Props) => {
    
  return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Total Coins - {coinHoldings.length}</h2>
            <div className="grid grid-cols-3 gap-4 mb-2 px-4">
              <div className="text-gray-400">Coin</div>
              <div className="text-gray-400">Holding</div>
              <div className="text-gray-400 text-right">Actions</div>
            </div>
            {coinHoldings.map((coin, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 bg-gray-800 p-4 rounded-lg mb-2 items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">₿</span>
                  </div>
                  <span>{coin.name}</span>
                </div>
                <div>{coin.amount}</div>
                <div className="text-right">
                  <button className="text-gray-400 hover:text-gray-200">
                    <LockIcon className="inline-block" size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
}

export default WalletTable