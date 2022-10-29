import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { flextCenter } from "src/style/style";
import { HiUserCircle } from "react-icons/hi";
import { useState } from "react";
import { useUserState } from "src/context/userContext";
import { removeCookie } from "src/utils/cookie";
import { authService } from "src/apis/authAPI";
import { useMutation } from "@tanstack/react-query";
import { UserState } from "src/types/user";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const node = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>;
  const [user, setValue] = useUserState() as [UserState, Dispatch<SetStateAction<UserState>>];

  const onSuccessOption = {
    onSuccess: () => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
      setValue({
        email: "",
        username: "",
        accessToken: "",
        userId: 0,
      });
      navigate("/");
    },
  };

  const { mutate } = useMutation(authService.logOut, onSuccessOption);

  const handleLogOut = async () => {
    mutate();
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (menuOpen && node.current && !node.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [menuOpen]);

  return (
    <Container>
      <SubContainer>
        <StyledLink to={"/"}>
          <Logo>CAG.</Logo>
        </StyledLink>
        <Menu ref={node} onClick={() => setMenuOpen((pre) => !pre)}>
          <HiUserCircle />
          {menuOpen && (
            <MenuList>
              {user.accessToken ? (
                <>
                  <StyledLink to={"/write"}>
                    <li>글쓰기</li>
                  </StyledLink>
                  <div onClick={handleLogOut}>
                    <li>로그아웃</li>
                  </div>
                </>
              ) : (
                <>
                  <StyledLink to={"/login"}>
                    <li>로그인</li>
                  </StyledLink>
                  <StyledLink to={"/signup"}>
                    <li>회원가입</li>
                  </StyledLink>
                </>
              )}
            </MenuList>
          )}
        </Menu>
      </SubContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  ${flextCenter}
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: solid 1px lightgray;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  height: 100%;
  padding: 0 30px;
`;

const Logo = styled.div`
  font-size: 35px;
  font-family: "Bungee Shade", cursive;
  color: #444;
  cursor: pointer;
`;
const Menu = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  ${flextCenter}
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
    font-size: 30px;
    color: gray;
  }
`;

const MenuList = styled.div`
  position: absolute;
  width: 120px;
  height: 100px;
  background-color: white;
  border: solid 1px lightgray;
  bottom: -100px;
  right: -30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    padding: 5px 10px;
    color: gray;
    width: 100%;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
