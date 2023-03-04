import { documentDir } from '@tauri-apps/api/path';
import { path,fs } from '@tauri-apps/api';

const docDir = await path.join(await documentDir(),'LimbusTranslator');
if(!await fs.exists(docDir)){
    await fs.createDir(docDir)
}
export const cachePath = await path.join(docDir,'cache')
export const outputPath = await path.join(docDir,'output')

if(!await fs.exists(cachePath)){
    await fs.createDir(cachePath)
}
if(!await fs.exists(outputPath)){
    await fs.createDir(outputPath)
}