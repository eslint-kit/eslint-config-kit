import { PackageManager } from '../shared-types'
import { AbstractRunner } from './abstract.runner'

export class YarnRunner extends AbstractRunner {
  constructor() {
    const name: PackageManager = 'yarn'
    super(name)
  }
}
