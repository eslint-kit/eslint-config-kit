import { PackageManager } from '../shared-types'
import { AbstractRunner } from './abstract.runner'

export class NpmRunner extends AbstractRunner {
  constructor() {
    const name: PackageManager = 'npm'
    super(name)
  }
}
