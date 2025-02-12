import { Link } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { routes } from "@common/constants.tsx";
function NavigationLinks({
  isSettings,
  keySuffix,
  handleCloseNavMenu,
}: {
  isSettings: boolean;
  keySuffix: string;
  handleCloseNavMenu: () => void;
}) {
  return routes
    .filter((page) => page.isSettings === isSettings)
    .map((page,index) => (
      <Link key={index + "_" + keySuffix} to={page.href}>
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography sx={{ textAlign: "center" }}>{page.page}</Typography>
        </MenuItem>
      </Link>
    ));
}

export default NavigationLinks;
