import { Outlet } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { GiCottonFlower } from "react-icons/gi";
import { SiCreatereactapp } from "react-icons/si";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "sonner";
import { logout, useCurrentUser } from "../../redux/features/authSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  console.log(user);

  const handleLogout = () => {
    dispatch(logout());
    toast("Logout successful");
  };

  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Add Project", link: "/add-project", icon: MdOutlineDashboard },
    {
      name: "Manage Projects",
      link: "/manage-projects",
      icon: MdOutlineDashboard,
    },
    { name: "Add Skill", link: "/add-skill", icon: MdOutlineDashboard },
    { name: "Manage Skills", link: "/manage-skills", icon: GiCottonFlower },
    { name: "Add Experience", link: "/add-experience", icon: SiCreatereactapp },
    {
      name: "Manage Experience",
      link: "/manage-experience",
      icon: SiCreatereactapp,
    },
    { name: "Write Blog", link: "/write-blog", icon: SiCreatereactapp },
    { name: "Manage Blog", link: "/manage-blogs", icon: SiCreatereactapp },
  ];
  const [open, setOpen] = useState(true);
  const [activeRoute, setActiveRoute] = useState("/");

  const handleLinkClick = (link: string) => {
    setActiveRoute(link);
  };

  return (
    <div>
      <section className="flex">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => {
              return (
                <Link
                  onClick={() => handleLinkClick(menu.link)}
                  to={menu?.link}
                  key={i}
                  className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ${
                    activeRoute === menu.link && "bg-blue-500" // Change color for active route
                  }`}
                >
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit 0`}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className={`bg-orange-500 rounded font-bold ${open ? "p-3" : "p-2 text-lg"}`}
            >
              {open ? "Logout" : <RiLogoutBoxRFill />}
            </button>
          </div>
        </div>
        <div className="overflow-y-auto w-full lg:p-5 bg-gradient-to-br from-[#000428] to-[#01427a] text-orange-500">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default MainLayout;

// className={`group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md `}
