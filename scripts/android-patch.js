// Tambah kebenaran mikrofon (untuk rakam suara) ke dalam projek Android selepas "npx cap add android".
const fs = require("fs");
const p = "android/app/src/main/AndroidManifest.xml";
let s = fs.readFileSync(p, "utf8");
for (const perm of ["android.permission.RECORD_AUDIO", "android.permission.MODIFY_AUDIO_SETTINGS"])
  if (!s.includes(perm)) s = s.replace("</manifest>", `    <uses-permission android:name="${perm}" />\n</manifest>`);
if (!s.includes("android.intent.action.TTS_SERVICE"))
  s = s.replace("</manifest>", `    <queries>\n        <intent>\n            <action android:name="android.intent.action.TTS_SERVICE" />\n        </intent>\n    </queries>\n</manifest>`);
fs.writeFileSync(p, s);
console.log("AndroidManifest dikemas kini: mikrofon + enjin suara");
