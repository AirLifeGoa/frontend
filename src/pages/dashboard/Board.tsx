import {StyleSheet, css} from "aphrodite";
import themeVars from "../../util/themeVars";
import Card from "../../components/cards/Card";
import InfoSection from "./InfoSection";
import InfoContainer from "./InfoContainer";
import InfoSubSection from "./InfoSubSection";
import ChartSection from "./ChatSection";
import PMTiles from "./PMTiles";
import TilesContainer from "./TilesContainer";
import GasesTiles from "./GasesTiles";
import ThermoTile from "./ThermoTile";
import WindTile from "./WindTile";
import LowestHighestTile from "./LowestHighestTile";
import Map from "../common/Map";
import Modal from "../../components/modals/Modal";
import SigninSignup from "../auth/SigninSignup";
// import AgrigateRadial from "./AgrigateRadial";
import ForTomorrowList from "./ForTomorrowList";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import FilterSection from "./FilterSection";
import MainNavBar from "./MainNavBar";
import VerticalGap from "../../components/VerticalGap";
import useStore from "../../store/Store";
import {getFilteredDataApi} from "../../util/api/get-filtered-data";

interface IBoardProps {
    openSideDrawer: () => void;
}
const Board = ({openSideDrawer} : IBoardProps) => {
    const url = useLocation().pathname;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(url === "/signin" || url === "/signup");
    const user = useStore((state) => state.user);
    useEffect(() => {
        setShowModal(url === "/signin" || url === "/signup");
    }
    , [url]);

    const onCloseModal = () => {
        setShowModal(false);
        navigate("/");
    }

    const today = new Date();
    const monthBack = new Date();
    monthBack.setMonth(today.getMonth() - 1);
    const [filterOptions, setFilterOptions] = useState({metric: "All", duration: "Daily", startDate: today, endDate: monthBack});

    const [location, setLocation] = useState({"sourceId": "", "sourceName": "", "sourceType": "", "sourceLat": 0, "sourceLng": 0, address: ""});

    const [data, setData] = useState([]);

    const getAndSetData = async () => {
        console.log("Locatio from getAndSetData", location)
        if (!location.sourceId) {
            return;
        }
        const response = await getFilteredDataApi(location.sourceId)
        if(response.type === "success") {
            setData(response.data.data);
        }
    }

    useEffect(() => {
        getAndSetData();
    }
    , [filterOptions, location]);
    return (
      <div className={css(styles.boardDefault)}>
          <Modal isOpen={showModal} onClose={onCloseModal}>
              <SigninSignup/>
          </Modal>
          <div className={css(styles.contentCont)}>
              <MainNavBar openSideDrawer={openSideDrawer} location={location} setLocation={setLocation}/>
              <VerticalGap gap={"2rem"}/>
              <FilterSection filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>
              <ChartSection data={data}/>
              <InfoContainer>
                  <InfoSection>
                      <Card type={"cardDark"}  height={"12rem"}>
                          <TilesContainer gap={"5%"}>
                              <PMTiles value={60} unit={"ug/m3"} label={"PM2.5"} type={"dark"}/>
                              <PMTiles value={120} unit={"ug/m3"} label={"PM10"} type={"dark"}/>
                          </TilesContainer>
                      </Card>
                      <Card type={"cardDark"}  height={"23rem"}>
                          <LowestHighestTile/>
                      </Card>
                      <Card type={"cardDark"}  height={"15rem"}>
                          <ForTomorrowList columnSize={4}/>
                      </Card>
                      <InfoSubSection>
                          <Card type={"cardDark"} width={"50%"} height={"8rem"}/>
                          <Card type={"cardDark"} width={"50%"} height={"8rem"}/>
                      </InfoSubSection>
                  </InfoSection>

                  <InfoSection>
                      <Card type={"cardDark"}  height={"9.2rem"}>
                          <TilesContainer gap={"2%"}>
                              <GasesTiles value={8} label={"O3"} type={"dark"}/>
                              <GasesTiles value={3} label={"SO2"} type={"dark"}/>
                              <GasesTiles value={6} label={"NO2"} type={"dark"}/>
                              <GasesTiles value={999} label={"CO"} type={"dark"}/>
                          </TilesContainer>
                      </Card>

                      <Card type={"cardDark"}  height={"42rem"} padding={"0"}>
                              <Map/>
                      </Card>
                      <InfoSubSection>
                          <Card type={"cardDark"} width={"60%"} height={"8rem"}/>
                          <Card type={"cardDark"} width={"40%"} height={"8rem"}/>
                      </InfoSubSection>
                  </InfoSection>

                  <InfoSection>
                      <InfoSubSection>
                          <Card type={"cardDark"} width={"50%"} height={"9.2rem"}>
                              <ThermoTile value={23}/>
                          </Card>
                          <Card type={"cardDark"} width={"50%"} height={"9.2rem"}>
                              <WindTile value={30}/>
                          </Card>
                      </InfoSubSection>
                      <Card type={"cardDark"} height={"33rem"} padding={"0"}>
                          <Map/>
                      </Card>
                      <Card type={"cardLight"} height={"12rem"}/>
                  </InfoSection>
              </InfoContainer>
          </div>
      </div>

    );
};
export default Board;

const styles = StyleSheet.create(
    {
        boardDefault: {
            width: '100%',
            minHeight: '100%',
            background: `linear-gradient(122.84deg,
            ${themeVars.colors.mainBackground.light} 0%,
            ${themeVars.colors.mainBackground.dark} 77.78%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            paddingTop: '2rem',
            paddingBottom: '2rem',
        },

        contentCont: {
            width: '90%',
            maxWidth: '1200px',
        }
    }
)
