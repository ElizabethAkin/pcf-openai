import { Choice } from "./Choice"
import { Usage } from "./Usage"

export interface OpenAIObject {
    id: string
    object: string
    created: number
    model: string
    choices: Choice[]
    usage: Usage
  }