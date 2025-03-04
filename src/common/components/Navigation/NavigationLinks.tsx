import { Link, useNavigate } from 'react-router';
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
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    const handleMenuClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, page: IRoute) => {
        event.preventDefault(); //отменяет Link перессылку
        if (page.href === '/login') {
            handleCloseNavMenu();
            if (session) {
                signOut();
            }
        } else {
            handleCloseNavMenu();
            navigate(page.href);
        }
    };

    return Object.values(routes)
        .filter((page) => page.isSettings === isSettings)
        .map((page, index) => (
            <Link key={index + '_' + keySuffix} to={page.href}>
                <MenuItem onClick={(event) => handleMenuClick(event, page)}>
                    <Typography sx={{ textAlign: 'center' }}>
                        {page.href === '/login' ? (session ? 'Выйти' : 'Войти') : page.page}
                    </Typography>
                </MenuItem>
            </Link>
        ));
}
export default NavigationLinks;
