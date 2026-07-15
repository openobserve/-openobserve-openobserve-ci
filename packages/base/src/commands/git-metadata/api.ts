import {getOpenObserveSite, getIntakeUrl} from '../../helpers/api'

export const ooSite = getOpenObserveSite()

export const apiHost = 'api.' + ooSite

export const getBaseIntakeUrl = () => getIntakeUrl('sourcemap-intake', {overrideEnvVar: 'OPENOBSERVE_SOURCEMAP_INTAKE_URL'})
