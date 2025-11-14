// scripts/update-env-ip.mjs
import os from "node:os";
import fs from "node:fs";

function pickPrivateIPv4() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const info of ifaces[name] || []) {
      if (
        info.family === "IPv4" &&
        !info.internal &&
        (info.address.startsWith("192.168.") ||
          info.address.startsWith("10.") ||
          (info.address.startsWith("172.") &&
            (() => {
              const n = parseInt(info.address.split(".")[1], 10);
              return n >= 16 && n <= 31; // 172.16.0.0/12
            })()))
      ) {
        return info.address;
      }
    }
  }
  return null;
}

const ip = pickPrivateIPv4();
if (!ip) {
  console.error("Could not determine a private IPv4 address.");
  process.exit(1);
}

const envPath = ".env";
let lines = [];
if (fs.existsSync(envPath)) {
  lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
}
const key = "EXPO_PUBLIC_SERVER_IP";
let found = false;
const out = lines
  .map((line) => {
    if (line.startsWith(`${key}=`)) {
      found = true;
      return `${key}=${ip}`;
    }
    return line;
  })
  .filter(Boolean);

if (!found) out.push(`${key}=${ip}`);
fs.writeFileSync(envPath, out.join("\n"));
console.log(`Set ${key}=${ip}`);
