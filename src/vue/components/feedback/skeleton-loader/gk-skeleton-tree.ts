import { gkSkeletonRootTypes, type GkSkeletonLoaderType } from './gk-skeleton-root-types'

export type GkSkeletonNode = {
  bone: string
  children: GkSkeletonNode[]
}

const rootMap = gkSkeletonRootTypes as Record<string, string>

function mapBones(bones: string): GkSkeletonNode[] {
  return bones
    .replace(/\s/g, '')
    .split(',')
    .filter(Boolean)
    .flatMap((part) => genStructure(part))
}

function genBones(bone: string): GkSkeletonNode[] {
  const [t, lenStr] = bone.split('@')
  const len = Math.max(1, parseInt(lenStr || '1', 10) || 1)
  return Array.from({ length: len }, () => genStructure(t)).flat()
}

/**
 * Builds a skeleton tree from a preset key (e.g. `card`) or comma-separated keys.
 */
export function genGkSkeletonStructure(type?: string): GkSkeletonNode[] {
  return genStructure(type)
}

function genStructure(type?: string): GkSkeletonNode[] {
  if (!type) return []

  if (type.includes(',')) {
    return mapBones(type)
  }
  if (type.includes('@')) {
    return genBones(type)
  }

  const bone = rootMap[type]

  if (bone === undefined) {
    return [{ bone: type, children: [] }]
  }

  if (type === bone) {
    return [{ bone: type, children: [] }]
  }

  let children: GkSkeletonNode[] = []

  if (bone.includes(',')) {
    children = mapBones(bone)
  } else if (bone.includes('@')) {
    children = genBones(bone)
  } else if (bone) {
    children = genStructure(bone)
  }

  return [{ bone: type, children }]
}

export function wrapGkSkeletonTypes(
  type: GkSkeletonLoaderType | (string & {}) | ReadonlyArray<GkSkeletonLoaderType | (string & {})>
): string {
  const list = Array.isArray(type) ? [...type] : [type]
  return list.join(',')
}

export function isGkSkeletonLoaderType(
  value: string
): value is GkSkeletonLoaderType {
  return value in gkSkeletonRootTypes
}
