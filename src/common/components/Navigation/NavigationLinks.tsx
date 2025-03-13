import { Link, useNavigate } from 'react-router';
import { useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { routes } from '@common/constants.tsx';
import { UserAuth } from '@common/contexts/AuthContext';

function NavigationLinks({
    isSettings,
    keySuffix,
    handleCloseNavMenu,
}: {
    isSettings: boolean;
    keySuffix: string;
    handleCloseNavMenu: () => void;
}) {
    const { isAuth, signOut } = UserAuth();
    const navigate = useNavigate();

    const handleMenuClick = useCallback(
        (href: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            event.preventDefault();

            if (href === routes.login.href) {
                handleCloseNavMenu();
                if (isAuth) signOut();
            } else {
                handleCloseNavMenu();
                navigate(href);
            }
        },
        [handleCloseNavMenu, isAuth, signOut, navigate],
    );

    return Object.values(routes)
        .filter((page) => page.isSettings === isSettings && page.isVisible)
        .map((page) => (
            <Link key={`${page.href}_${keySuffix}`} to={page.href}>
                <MenuItem onClick={handleMenuClick(page.href)}>
                    <Typography sx={{ textAlign: 'center' }}>{page.page}</Typography>
                </MenuItem>
            </Link>
        ));
}

export default NavigationLinks;
