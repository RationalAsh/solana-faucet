npm run build
cp -r build/* ~/Personal\ Website/static/dapps/solana-faucet
cd ~/Personal\ Website/ && ./compile_on_mac.sh
cd ~/Github/rationalash.github.io && git add --all . && git commit -m "$1" && git push origin master