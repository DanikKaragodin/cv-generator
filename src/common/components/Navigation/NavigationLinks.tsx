import { Link } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { routes } from '@common/constants.tsx';
import { UserAuth } from '@common/contexts/AuthContext';
import { IRoute } from '@common/types/Route';
function NavigationLinks({
    isSettings,
    keySuffix,
    handleCloseNavMenu,
}: {
    isSettings: boolean;
    keySuffix: string;
    handleCloseNavMenu: () => void;
}) {
    const { session, signOut, setIsLogoutAction } = UserAuth();

    const handleLoginLogoutClick = (page: IRoute) => {
        if (page.href === '/login') {
            if (session) {
                session.user.email = '';
                setIsLogoutAction(true);
                signOut();
            }
            handleCloseNavMenu();
        }
    };

    return Object.values(routes)
        .filter((page) => page.isSettings === isSettings)
        .map((page, index) => (
            <Link key={index + '_' + keySuffix} to={page.href}>
                <MenuItem onClick={() => handleLoginLogoutClick(page)}>
                    <Typography sx={{ textAlign: 'center' }}>{page.page}</Typography>
                </MenuItem>
            </Link>
        ));
}
export default NavigationLinks;
