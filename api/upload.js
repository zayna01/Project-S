import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { image } = req.body;

        const base64Data = image.replace(/^data:image\\/png;base64,/, '');
        const filename = `selfie_${Date.now()}.png`;
        const filepath = path.join('/tmp', filename);

        fs.writeFileSync(filepath, base64Data, 'base64');

        res.status(200).json({ message: 'Bild gespeichert', filename });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
