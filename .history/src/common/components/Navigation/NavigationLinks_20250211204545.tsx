import React from "react";
import { IRoute } from "@types/IRoute";
import { Link } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

function NavigationLinks(
  routes: IRoute[],
  isSettings: boolean,
  keySuffix: string,
  handleCloseNavMenu: () => void
) {
  return routes
    .filter((page) => page.isSettings === isSettings)
    .map((page) => (
      <Link key={page.page + "_" + keySuffix} to={page.href}>
        <MenuItem onClick={handleCloseNavMenu}>
          <Typography sx={{ textAlign: "center" }}>{page.page}</Typography>
        </MenuItem>
      </Link>
    ));
}

export default NavigationLinks;