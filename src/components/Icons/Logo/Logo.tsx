import type { CSSProperties } from "@mui/material";
import logo from "../../../assets/logo.svg";

const Logo = ({ sx }: { sx?: CSSProperties }) => {
	return <img src={logo} alt="Logo" style={sx ?? { width: 40, height: 40 }} />;
};

export default Logo;
