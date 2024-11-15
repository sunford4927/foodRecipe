import React, { useEffect } from 'react';
import SearchOk from '../../img/돋보기.png';
import Profile from '../../img/프로필.png';
import MenuBtn from '../../img/메뉴.png';
import logo from '../../img/logo.png';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoType } from 'redux/actions/ActionTypes';
import { usePreventRefresh } from 'components/customhook/refresh/Refresh';
import { Button, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';

const size1 = {
    width: '30px',
    height: '30px'
};

const size2 = {
    width: '40px',
    height: '40px'
};

const Header: React.FC = () => {
    const nav = useNavigate();
    const isLogin = useSelector((state: any) => state.isLogin);
    const user = useSelector((state: { user: userInfoType }) => state.user);
    usePreventRefresh();

    useEffect(() => {
        console.log(user.nick);
    }, [isLogin]);
    return (
        <div>
            {/* 내비게이션 바 (상단 메뉴바) */}
            <Navbar bg="secondary" expand="lg" sticky='top'>
                <Container>
                    {/* 로고 */}
                    <Navbar.Brand href='/'>  {/* 클릭 시 홈으로 이동 */}
                        <img
                            className='cursor'  // 마우스 커서가 손 모양으로 변경
                            src={logo}  // 로고 이미지 경로
                            alt="로고"
                            style={{ width: 200, height: 44, marginRight: 10}}  // 로고 크기 설정
                        />
                    </Navbar.Brand>

                    {/* 모바일 화면에서 메뉴를 펼치기 위한 토글 버튼 */}
                    <Navbar.Toggle aria-controls="navbar-nav" />

                    {/* 내비게이션 메뉴 (모바일 화면에서 토글로 보여짐) */}
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            {/* 검색창 */}
                            <InputGroup className="search-group">  {/* 검색창을 그룹화 */}
                                <Form.Control
                                    type="text"
                                    placeholder="검색"  // 입력 필드에 나타날 텍스트
                                    aria-label="Search"  // 접근성 향상을 위한 라벨
                                    name="searchBox"  // 검색 입력 필드 이름
                                    className='searchBox'
                                />
                                {/* 돋보기 버튼 (검색 버튼) */}
                                <Button variant="outline-primary">
                                    <img src={SearchOk} alt="search icon" style={size1} />  {/* 돋보기 아이콘 */}
                                </Button>
                            </InputGroup>
                        </Nav>

                        {/* 사용자 아이콘 및 메뉴 아이콘 */}
                        <Nav>
                            {/* 로그인된 사용자의 닉네임을 표시 */}
                            <Nav.Item>
                                {user.nick && (  // 사용자가 로그인했을 때만 표시
                                    <Nav.Link disabled >{`${user.nick} 님 환영합니다`}</Nav.Link>
                                )}
                            </Nav.Item>

                            {/* 프로필 아이콘, 클릭 시 로그인 페이지로 이동 */}
                            <Nav.Item>
                                <Nav.Link 
                                className='cursor'
                                onClick={() => nav("/login")}>
                                    <img src={Profile} alt="프로필" style={size2} />  {/* 프로필 아이콘 */}
                                </Nav.Link>
                            </Nav.Item>

                            {/* 메뉴 아이콘 */}
                            {/* <Nav.Item>
                                <Nav.Link>
                                    <img src={MenuBtn} alt="메뉴" style={size} /> 
                                </Nav.Link>
                            </Nav.Item> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 하단에 고정되는 메뉴 (분류, 랭킹) */}
            <div className='menuContainer'>
                {/* '분류' 클릭 시 홈으로 이동 */}
                <span className='cursor standard' onClick={() => nav('/')}>분류</span>
                {/* '랭킹' 클릭 시 랭킹 페이지로 이동 */}
                <span className='cursor standRank' onClick={() => nav('/rank')}>랭킹</span>
            </div>
        </div>
    );
};

export default Header;
