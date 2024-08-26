let handler = async (m) => {
    let totalFunctions = Object.values(global.plugins).filter(v => v.command).length;
    let numSymbols = ['𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗', '𝟏𝟎'];
    let numDisplay = totalFunctions.toString().split('').map(digit => numSymbols[digit]).join('');
    
    m.reply(`ⓘ 𝐈𝐥 𝐛𝐨𝐭 𝐡𝐚 ${numDisplay}  𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐢.`);
};

handler.command = ['funzionitotali', 'functions'];
export default handler;