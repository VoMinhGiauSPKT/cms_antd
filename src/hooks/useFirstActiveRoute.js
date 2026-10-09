import { navMenuConfig } from '@constants/menuConfig';
import useAuth from '@hooks/useAuth';
import useValidatePermission from '@hooks/useValidatePermission';
import routes from '@routes';

function useFirstActiveRoute() {
    const validatePermission = useValidatePermission();
    const { profile } = useAuth();

    function findFirstValidRoute(navs) {
        for (const nav of navs) {
            if (!nav) continue;
            const { isSuperAdmin, ...newNav } = { ...nav };

            if (isSuperAdmin && !profile?.isSuperAdmin) continue;

            const hasPermission =
                (!newNav.permission && !newNav.kind) ||
                validatePermission(newNav.permission, newNav.kind, newNav.excludeKind, newNav.onValidate);

            if (!hasPermission) continue;

            if (newNav.children && newNav.children.length > 0) {
                const child = findFirstValidRoute(newNav.children);
                if (child) return child;
            }

            if (newNav.path) return newNav;
        }

        return null;
    }

    const route = findFirstValidRoute(navMenuConfig);
    if (!route) return routes.loginPage.path;
    let path = route.path || '';

    if (route.query) {
        const queryString = new URLSearchParams(route.query)?.toString();
        if (queryString) {
            path += `?${queryString}`;
        }
    }

    return path;
}

export default useFirstActiveRoute;
