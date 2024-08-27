{ pkgs }: { 
     deps = [ 
         pkgs.nodejs 
         pkgs.nodePackages.typescript 
         pkgs.ffmpeg 
         pkgs.imagemagick 
         pkgs.git 
         pkgs.neofetch 
         pkgs.libwebp 
         pkgs.speedtest-cli 
         pkgs.wget 
         pkgs.yarn 
         pkgs.libuuid 
         pkgs.nodePackages.whatsapp-web.js # Aggiunta libreria per WhatsApp
         pkgs.nodePackages.qrimage         # Per generare codici QR
     ]; 
     env = { 
         LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [ 
             pkgs.libuuid 
         ]; 
     }; 
}