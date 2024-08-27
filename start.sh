GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'

while true; do
    echo -e "${GREEN}Connettendo..."
    node index.js

    if [ $? -ne 0 ]; then
        echo -e "${RED}Errore nella connessione. Riprovo in 5 secondi..."
        sleep 5
    else
        echo -e "${BLUE}Connessione stabilita. In attesa di nuovi eventi..."
    fi

    sleep 1
done