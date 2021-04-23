import { Layout, Menu, Row, Col, Button, Modal, Divider, Dropdown, Drawer } from "antd";
import { DownOutlined, UserOutlined, ImportOutlined, HeartOutlined, CalendarOutlined, PicLeftOutlined, MenuOutlined } from '@ant-design/icons';
import LogIn from "../LogIn/LogIn";
import { useEffect, useState } from "react";
import "./NavBar.less";
import { Register } from "../LogIn/Register";
import { supabase } from '../../SupaBase/conection'
import { logOut } from "../../helpers/logOut";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../actions/loginActions";
import { NavLink, useHistory, Link } from "react-router-dom";
import hotel from "./logoHotel.png"

const { Header } = Layout;

export const NavBar = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  //Valida si el usuario esta logueado
  const authValidation = () => {
    const user: any = supabase.auth.user()
    if (user?.aud === "authenticated") {
      return true
    }
  }

  const number = useSelector((state: any) => state.login.number);

  const logOutSession = () => {
    var status = logOut()
    status && history.push("/");
  }

  const menu = (
    <Menu className="dropMenuNav">
      <Menu.Item key="1" onClick={() => history.push("/myProfile")} icon={<PicLeftOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<HeartOutlined />}>
        Wish List
      </Menu.Item>
      <Menu.Item key="3" onClick={() => history.push("/myBookings")} icon={<CalendarOutlined />}>
        Bookings
      </Menu.Item>
      <Divider className="dividerNav"></Divider>
      <Menu.Item key="4" onClick={() => logOutSession()} icon={<ImportOutlined />}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  const [visible, setVisible] = useState<boolean>(false);
  const [regOrLog, setRegOrLog] = useState<string>("logIn")


  //Resposive Nav
  const [resNavVisivle, setResNavVisivle] = useState<boolean>(false)
  const handleNavResponsive = () => {
    setResNavVisivle(true)
  }

  //--------


  useEffect(() => {
    if (number === 1) {
      setVisible(false)
      dispatch(setModalState(0))
    }
  }, [number, dispatch])

  return (
    <>
      <div className="NavBarLayout">
        {/* Normal navBar content */}
        <div className="navBarMenu">
          <div className="colContainer">
            <Col span={12}>
              <div className="navLeft">
                <img className="imagen" src={hotel} alt="IMG NOT FOUND" />
                {/* <NavLink className="navTitle" to="/home">HENRY HOTEL</NavLink> */}
              </div>
            </Col>
            <Col span={12}>
              <div className="navRight">
                <NavLink to="/home">
                  <Button className="navButton" size="large" type="text">
                    Home
                    </Button>
                </NavLink>
                <NavLink to="/accomodations">
                  <Button className="navButton" size="large" type="text">
                    Accomodations
                    </Button>
                </NavLink>
                <div className="navLoginButton">
                  {
                    authValidation() ?
                      <Dropdown
                        className="DropNavButton"
                        overlay={menu}
                        trigger={['click']}
                        placement="bottomCenter">
                        <Button className="btn-nav" type="primary">
                          <UserOutlined />Account <DownOutlined />
                        </Button>
                      </Dropdown>

                      :
                      <Button
                        onClick={() => setVisible(true)}
                        className="navButton"
                        type="text">
                        Log In
                         </Button>
                  }
                </div>
                <NavLink to="/booking">
                  <Button
                    size="large"
                    className="btnNavbar"
                  >
                    Book Now
                    </Button>
                </NavLink>
              </div>
            </Col>
          </div>
        </div>


        {/* Responsive Navbar Content */}
        <div className="navResponsiveMenu" >

          <img className="imagen" src={hotel} alt="IMG NOT FOUND" />

          <Button className="navButton"  type="text" onClick={handleNavResponsive} >
            <MenuOutlined style={{ fontSize: '25px', color: 'white' }} />
          </Button>

        </div>
      </div>
      {/* ----------------------- */}

      <Drawer
        placement="right"
        closable={false}
        onClose={() => setResNavVisivle(false)}
        visible={resNavVisivle}
        key="top"
        width="300px"
        zIndex={1200}
        drawerStyle={{ backgroundColor: "rgb(231, 231, 231)"}}
      >
        <div className="navDrawerContent">

          <NavLink to="/booking">
            <Button
              size="large"
              className="btnNavbar" >
              Book Now
            </Button>
          </NavLink>
          <NavLink to="/accomodations">
            <Button className="navButton" size="large" type="text">
              Accomodations
            </Button>
          </NavLink>
          <NavLink to="/home">
            <Button className="navButton" size="large" type="text">
              Home
            </Button>
          </NavLink>



        </div>
      </Drawer>

      <Modal
        visible={visible}
        width={450}
        destroyOnClose={true}
        footer={[
          <div>{regOrLog === "logIn" ?
            <div>Don't have an account?
              <Button style={{ marginLeft: "8px" }} onClick={() => setRegOrLog("signIn")}> Sign Up</Button>
            </div> :
            <div>
              If you have an account
              <Button style={{ marginLeft: "8px" }} onClick={() => setRegOrLog("logIn")}>Log In</Button>
            </div>
          }
          </div>,
        ]}
        onCancel={() => {
          setRegOrLog("logIn")
          setVisible(false)
        }}
      >
        {regOrLog === "logIn" ? <LogIn /> : <Register />}
      </Modal>
    </>
  );
};