import { MessageSquare } from "lucide-react";

const WalletConnect = ({ connectWallet }) => {
  return (
    <div className="flex items-center justify-between h-screen bg-[#1a1618]">
      {/* Left section with form */}
      <div className="w-1/2 px-16 flex flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="text-[#D4A853] size-8" />
            <span className="text-[#D4A853] text-2xl font-semibold">
              BlockShare
            </span>
          </div>

          <h1 className="text-[#D4A853] text-4xl font-bold mb-2">
            Welcome Back
          </h1>
          <p className="text-[#8B8787] mb-8">Connect your wallet to continue</p>

          <button
            onClick={connectWallet}
            className="w-full px-6 py-4 bg-[#D4A853] text-[#1a1618] rounded-lg 
                     hover:bg-[#c09748] transition-colors duration-200 font-semibold
                     flex items-center justify-center gap-2"
          >
            Connect Wallet
          </button>

          {/* {error && (
            <p className="mt-4 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900">
              {error}
            </p>
          )} */}
        </div>
      </div>

      {/* Right section with grid decoration */}
      <div className="w-1/2 h-full p-8 flex items-center justify-center bg-[#1a1618]">
        <div className="w-full max-w-lg">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-[#2a2426] transition-all duration-300
                         hover:bg-[#D4A853]/10"
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-[#D4A853] text-3xl font-bold mb-3">
              Connect your wallet!
            </h2>
            <p className="text-[#8B8787] max-w-md mx-auto">
              Sign in to continue your conversations and catch up with your
              messages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
