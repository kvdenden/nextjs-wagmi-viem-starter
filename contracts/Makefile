
-include .env

# Clean the repo
clean  :; forge clean

anvil :; anvil -m 'test test test test test test test test test test test junk'

deploy :; @forge script script/Deploy.s.sol --rpc-url ${RPC_URL}  --private-key ${PRIVATE_KEY} --broadcast --verify --etherscan-api-key ${ETHERSCAN_API_KEY}  -vvvv

# This is the private key of account from the mnemonic from the "make anvil" command
deploy-anvil :; @forge script script/Deploy.s.sol --rpc-url http://localhost:8545  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast 

configure-allowlist :; @forge script script/ConfigureSale.s.sol:Allowlist --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast 
configure-public :; @forge script script/ConfigureSale.s.sol:Public --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast 
enable-allowlist :; @forge script script/EnableSale.s.sol:Allowlist --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast 
enable-public :; @forge script script/EnableSale.s.sol:Public --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --broadcast 