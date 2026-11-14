// Gộp web/public (index.html + css + js) thành MỘT trang rồi ghi vào esp32/TuTruong_ESP32/page.h
// Cần Node.js. Chạy từ thư mục gốc của dự án:  node tools/build-page.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), pub = path.join(root, 'web', 'public');
const read = f => fs.readFileSync(path.join(pub, f), 'utf8');

let html = read('index.html');
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/, (_, f) => '<style>\n' + read(f) + '</style>');
const tags = html.match(/<script src="[^"]+"><\/script>\r?\n/g) || [];
if (!tags.length) throw new Error('Không thấy thẻ <script src> nào trong web/public/index.html');
const js = tags.map(t => read(t.match(/src="([^"]+)"/)[1])).join('');
html = html.replace(tags.join(''), () => '<script>\n' + js + '</script>\n');

if (html.includes(')rawliteral"')) throw new Error('Trang chứa chuỗi )rawliteral" nên không nhúng được vào page.h');
const out = path.join(root, 'esp32', 'TuTruong_ESP32', 'page.h');
fs.writeFileSync(out, 'const char PAGE[] PROGMEM = R"rawliteral(\n' + html + ')rawliteral";\n');
console.log('Đã tạo ' + path.relative(root, out) + ' (' + html.length + ' ký tự)');
