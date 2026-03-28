export const gkNavigationDrawerLocations = [
  'start',
  'end',
  'left',
  'right',
  'top',
  'bottom',
] as const

export type GkNavigationDrawerLocation = (typeof gkNavigationDrawerLocations)[number]

export type GkNavigationDrawerImageSlotProps = {
  image: string | undefined
}
