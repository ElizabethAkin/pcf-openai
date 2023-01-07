import { Choice } from "./Choice"
import { Usage } from "./Usage"

export interface OpenAIobject {
    id: string
    object: string
    created: number
    model: string
    choices: Choice[]
    usage: Usage
  }