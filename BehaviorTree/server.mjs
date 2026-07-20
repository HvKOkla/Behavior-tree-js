import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const ROOT = path.resolve('.');

http.createServer((req, res) => {
    const requestUrl = new URL(req.url || '/', 'http://localhost');
    let requestPath = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;

    try {
        requestPath = decodeURIComponent(requestPath);
    } catch {
        res.writeHead(400);
        res.end("Requête invalide");
        return;
    }

    const filePath = path.resolve(ROOT, '.' + requestPath);
    const relativePath = path.relative(ROOT, filePath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        res.writeHead(403);
        res.end("Accès interdit");
        return;
    }

    const ext = path.extname(filePath);
    const contentType = ext === '.json' ? 'application/json' : ext === '.js' ? 'text/javascript' : 'text/html';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Fichier non trouvé");
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}).listen(PORT, () => {
    console.log(`🚀 Serveur prêt : http://localhost:${PORT}`);
});