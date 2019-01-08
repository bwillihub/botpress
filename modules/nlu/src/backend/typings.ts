import sdk from 'botpress/sdk'

export const BIO = {
  INSIDE: 'I',
  BEGINNING: 'B',
  OUT: 'o'
}

export type Tag = 'o' | 'B' | 'I'

export interface Token {
  tag?: Tag
  value: string
  slot?: string
  start: number
  end: number
  matchedEntities: string[]
}

export interface Sequence {
  intent: string
  cannonical: string
  tokens: Token[]
}

export type EngineByBot = { [botId: string]: Engine }

export interface Engine {
  sync(): Promise<void>
  checkSyncNeeded(): Promise<boolean>
  extract(event): Promise<sdk.IO.EventUnderstanding>
}

export interface EntityExtractor {
  extract(input: string, lang: string): Promise<sdk.NLU.Entity[]>
}

export interface SlotExtractor {
  load(trainingSet: Sequence[], language: Buffer, crf: Buffer): Promise<void>
  train(trainingSet: Sequence[]): Promise<{ language: Buffer, crf: Buffer }>
  extract(input: string, intent: sdk.NLU.IntentDefinition, entities: sdk.NLU.Entity[]): Promise<sdk.NLU.SlotsCollection>
}

export interface IntentClassifier {
  predict(input: string): Promise<sdk.NLU.Intent[]>
}

export interface LanguageIdentifier {
  identify(input: string): Promise<string>
}

export const MODEL_TYPES = {
  INTENT: <ModelType>'intent',
  SLOT_LANG: <ModelType>'slot-language-model',
  SLOT_CRF: <ModelType>'slot-crf',
}

export type ModelType = 'intent' | 'slot-language-model' | 'slot-crf'

export interface ModelMeta {
  fileName?: string
  created_on: number // timestamp
  hash: string
  type: string
}

export interface Model {
  meta: ModelMeta
  model: Buffer
}
