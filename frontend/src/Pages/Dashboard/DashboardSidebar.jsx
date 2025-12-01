import { useDispatch, useSelector } from "react-redux";
import profileIcon from "../../assests/images/profile-placeholder.png";
import { Nav } from "react-bootstrap";
import { MdSwitchAccount } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCartCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useSnackbar } from "notistack";
import { logoutUser } from "../../Store/Actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";

const accountMenus = [
    {
        title: "Profile Information",
        url: "/dashboard",
        icon: <MdSwitchAccount />,
    },
    {
        title: "Change Password",
        url: "/profile",
        icon: <RiLockPasswordFill />,
    },
    {
        title: "Address",
        url: "/address",
        icon: <RiUserLocationFill />,
    },
    {
        title: "Orders",
        url: "/my-orders",
        icon: <BsCartCheckFill />,
    },
    {
        title: "My Wishlist",
        url: "/wishlist",
        icon: <FaHeart />,
    }
]

const DashboardSidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        enqueueSnackbar("Logout Successfully", { variant: "success" });
    }

    return(
        <div className="dashboard_sidebar">
            <div className="dashboard_sidebar_cols profile_details">
                <img src={profileIcon} alt="Profile" className="profile_icon" />
                <p className="profile_name paragraph">{user.name}</p>
            </div>

            <div className="dashboard_sidebar_cols account_menus">
                <Nav>
                    {accountMenus.map((item,i) => (
                        <NavLink to={item.url} key={i} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            {item.icon}
                            {item.title}
                        </NavLink>
                    ))}

                    <Nav.Link onClick={() => handleLogout()}><RiLogoutBoxRFill /> Logout</Nav.Link>
                </Nav>
            </div>
        </div>
    )
}

export default DashboardSidebar