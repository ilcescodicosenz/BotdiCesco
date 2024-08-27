import speed from "performance-now";

let handler = async (m, { conn }) => {
  let ini_timestamp = speed();
  await conn.reply(m.chat, 'Calcolando il ping...');
  let ini_latensi = speed() - ini_timestamp;
  let text_ping = `Ping: ${ini_latensi.toFixed(4)} ms`;
  conn.reply(m.chat, text_ping);
};

handler.command = ["test", "ping"];
export default handler;