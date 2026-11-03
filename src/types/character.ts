// Tipos de los datos que devuelve la Rick and Morty API
// https://rickandmortyapi.com/documentation

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown'

export interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: string
  origin: { name: string; url: string }
  location: { name: string; url: string }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterListResponse {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}

// Traducciones para mostrar los datos en español
export const statusLabel: Record<CharacterStatus, string> = {
  Alive: 'Vivo',
  Dead: 'Muerto',
  unknown: 'Desconocido',
}

const speciesMap: Record<string, string> = {
  Human: 'Humano',
  Alien: 'Alien',
  Humanoid: 'Humanoide',
  Robot: 'Robot',
  Animal: 'Animal',
  Cronenberg: 'Cronenberg',
  'Mythological Creature': 'Criatura mitológica',
  Poopybutthole: 'Poopybutthole',
  Disease: 'Enfermedad',
  unknown: 'Desconocida',
}

const genderMap: Record<string, string> = {
  Male: 'Masculino',
  Female: 'Femenino',
  Genderless: 'Sin género',
  unknown: 'Desconocido',
}

export const translateSpecies = (s: string) => speciesMap[s] ?? s
export const translateGender = (g: string) => genderMap[g] ?? g
export const translatePlace = (p: string) => (p === 'unknown' ? 'Desconocido' : p)
