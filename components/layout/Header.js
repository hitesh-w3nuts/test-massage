import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { post } from "@/helpers/api_helper";
import { headerQuery } from "@/helpers/api_gq_query_helper";

import Image from "next/image";
import logo from "../../assets/image/logo.png";
import logoLoader from "assets/image/logo.svg";
import cartImg from "../../assets/image/shopping-bag.png";
import loginAvtarIcon from "../../assets/image/profile-user.png";

const Header = () => {
  const [headerData, setheaderData] = useState(null);
  useEffect(() => {
    if (headerData == null) {
      const getData = async () => {
        const res = await post('api/graphql', headerQuery);
        // document.getElementById("#header").classList.add("loaded")
        if (res.data != undefined && res.data != null) {
          setheaderData(res.data);
        }
      }
      getData();
      setTimeout(() => {
        document.body.classList.add("loaded");
      }, 5000)
    }
  });

  const router = useRouter();

  const NavLink = ({ url = "#", text }) => (
    <li className={router.pathname == url.replace(/\/+$/, '') ? "active" : ""} onClick={(e) => { setIsActive(false) }} >
      <Link href={url} >{text}</Link>
    </li>
  );

  const [isActive, setIsActive] = useState(false);

  const HamMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="loader">
          {/* <Image src={logoLoader} alt="logo" width={249} height={39} /> */}
          <img src={`/logo.svg`} alt={`logo`} />
      </div>
      <div id="header" className={isActive ? "show_menu" : ""}>
        <div className="header_wapper flxrow">
          <div className="menuoverlay"></div>

          <div className="logo">
            {(headerData != null && headerData.themeHeaderSettings != undefined && headerData.themeHeaderSettings.headerSettings.headerLogo != null && headerData.themeHeaderSettings.headerSettings.headerLogo != undefined) &&
              <Link href="/">
                {/* <Image src={headerData.themeHeaderSettings.headerSettings.headerLogo.sourceUrl} alt="logo" width={249} height={39} /> */}
                <img src={headerData.themeHeaderSettings.headerSettings.headerLogo.sourceUrl} alt={`logo`} />
              </Link>
            }
          </div>

          <div className="ham_menubtn">
            <a href="#" onClick={HamMenu} className={isActive ? "active" : ""}>
              <span></span>
              <span></span>
            </a>
          </div>

          <nav className="navigation_main">
            <ul>
              {headerData != null && headerData.menuItems != null && headerData.menuItems != null && headerData.menuItems.nodes.map((navLinks) => (
                <NavLink url={navLinks.uri} text={navLinks.label} key={navLinks.id} />
              ))}
            </ul>
            <div className="mnluser flxrow d-none d-lg-flex">
              <div className="useritem">
                <i>
                  <Link href="/cart">
                    <Image src={cartImg} alt="cartImg" />
                  </Link>
                </i>
              </div>

              <div className="useritem open">
                <i>
                  <Link href="/my-account">
                    <Image src={loginAvtarIcon} alt="loginAvtarIcon" />
                  </Link>
                </i>
              </div>
            </div>
          </nav>

          <div className="mnluser flxrow d-lg-none">
            <div className="useritem">
              <i>
                <Link href="/cart">
                  <Image src={cartImg} alt="cartImg" />
                </Link>
              </i>
            </div>

            <div className="useritem open">
              <i>
                <Link href="/my-account">
                  <Image src={loginAvtarIcon} alt="loginAvtarIcon" />
                </Link>
              </i>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
