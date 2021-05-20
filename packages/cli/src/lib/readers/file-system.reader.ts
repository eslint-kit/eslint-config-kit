import fs from 'fs'

export class FileSystemReader {
  static readFile(path: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (error, data) => {
        if (error) reject(error)
        else resolve(data)
      })
    })
  }

  static readDir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (error, files) => {
        if (error) reject(error)
        else resolve(files)
      })
    })
  }

  static writeFile(path: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content, {}, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
}
