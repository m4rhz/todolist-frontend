/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 */

interface IRoute {
  path?: string
  icon?: string
  name: string
  routes?: IRoute[]
  checkActive?(pathname: String, route: IRoute): boolean
  exact?: boolean
}

export function routeIsActive(pathname: String, route: IRoute): boolean {
  if (route.checkActive) {
    return route.checkActive(pathname, route)
  }

  return route?.exact
    ? pathname == route?.path
    : (route?.path ? pathname.indexOf(route.path) === 0 : false)
}

const routes: IRoute[] = [
  {
    path: '/example', 
    icon: 'HomeIcon', 
    name: 'Dashboard',
    exact: true,
  },
  {
    path: '/example/task',
    icon: 'TablesIcon',
    name: 'Task',
  },
  {
    path: '/example/user',
    icon: 'CardsIcon',
    name: 'User',
  },
  {
    path: '/example/role',
    icon: 'ChartsIcon',
    name: 'Role',
  },
]

export type { IRoute }
export default routes
