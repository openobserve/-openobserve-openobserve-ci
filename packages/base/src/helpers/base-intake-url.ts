import {getIntakeUrl} from './api'

export const getBaseSourcemapIntakeUrl = (ooSite?: string) =>
  getIntakeUrl('sourcemap-intake', {overrideEnvVar: 'OPENOBSERVE_SOURCEMAP_INTAKE_URL', site: ooSite})
