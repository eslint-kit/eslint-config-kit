import fs from 'fs'

export class FileSystemReader {
  static readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  }

  static readDir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err)
        else resolve(files)
      })
    })
  }

  static writeFile(path: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, {}, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}
